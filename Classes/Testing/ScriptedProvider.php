<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Testing;

use Netresearch\NrLlm\Domain\Enum\ModelCapability;
use Netresearch\NrLlm\Domain\Model\CompletionResponse;
use Netresearch\NrLlm\Domain\Model\EmbeddingResponse;
use Netresearch\NrLlm\Domain\Model\UsageStatistics;
use Netresearch\NrLlm\Domain\ValueObject\ToolCall;
use Netresearch\NrLlm\Provider\AbstractProvider;
use Netresearch\NrLlm\Provider\Contract\ToolCapableInterface;
use RuntimeException;

/**
 * An LLM that says exactly what a test told it to say.
 *
 * A real adapter driven by a queue, so the loop's own normalisation is
 * exercised without a network. The queue is a FILE, because a functional test
 * rebuilds the container between the test and the turn under test.
 *
 * NOT PRODUCTION CODE. Registered only when the application context is
 * Development or Testing AND `SHADCN_UI_SCRIPTED_PROVIDER=1` is set — see
 * Configuration/Services.php. Two independent conditions, because one alone is
 * the kind of thing that gets turned on by accident.
 */
final class ScriptedProvider extends AbstractProvider implements ToolCapableInterface
{
    public const ADAPTER_TYPE = 'scripted';

    public const ENV_FLAG = 'SHADCN_UI_SCRIPTED_PROVIDER';

    public const ENV_SCRIPT = 'SHADCN_UI_SCRIPT_FILE';

    public function getName(): string
    {
        return 'Scripted (testing)';
    }

    public function getIdentifier(): string
    {
        return self::ADAPTER_TYPE;
    }

    protected function getDefaultBaseUrl(): string
    {
        return 'https://scripted.invalid';
    }

    public function isAvailable(): bool
    {
        return true;
    }

    public function supportsTools(): bool
    {
        return true;
    }

    public function supportsFeature(string|ModelCapability $feature): bool
    {
        return true;
    }

    /**
     * @return array<string, string>
     */
    public function getAvailableModels(): array
    {
        return ['scripted-1' => 'Scripted 1'];
    }

    public function getDefaultModel(): string
    {
        return 'scripted-1';
    }

    public function testConnection(): array
    {
        return ['success' => true, 'message' => 'The scripted provider needs no connection.'];
    }

    /**
     * @param list<mixed>          $messages
     * @param array<string, mixed> $options
     */
    public function chatCompletion(array $messages, array $options = []): CompletionResponse
    {
        return $this->nextResponse();
    }

    /**
     * @param list<mixed>          $messages
     * @param list<mixed>          $tools
     * @param array<string, mixed> $options
     */
    public function chatCompletionWithTools(array $messages, array $tools, array $options = []): CompletionResponse
    {
        return $this->nextResponse();
    }

    /**
     * @param string|array<int, string> $input
     * @param array<string, mixed>      $options
     */
    public function embeddings(string|array $input, array $options = []): EmbeddingResponse
    {
        return new EmbeddingResponse([], $this->getDefaultModel(), new UsageStatistics(0, 0, 0));
    }

    /**
     * Queue what the model will say, in order. Each entry is
     * `['content' => '…']` or `['toolCalls' => [['id' => …, 'name' => …, 'arguments' => [...]], …]]`.
     *
     * @param list<array<string, mixed>> $responses
     */
    public static function script(array $responses): void
    {
        file_put_contents(self::scriptFile(), json_encode($responses, JSON_THROW_ON_ERROR));
    }

    public static function reset(): void
    {
        $file = self::scriptFile();
        if (is_file($file)) {
            unlink($file);
        }
    }

    public static function scriptFile(): string
    {
        $configured = getenv(self::ENV_SCRIPT);

        return is_string($configured) && $configured !== '' ? $configured : sys_get_temp_dir() . '/shadcn-ui-script.json';
    }

    /**
     * Running out is an ERROR, not an empty answer: a loop that took one more
     * round than the test scripted has changed behaviour.
     */
    private function nextResponse(): CompletionResponse
    {
        $file = self::scriptFile();
        $queue = json_decode(is_file($file) ? (string)file_get_contents($file) : '[]', true);
        if (!is_array($queue) || $queue === []) {
            throw new RuntimeException('The scripted provider was asked for a response the test did not script.', 1795000501);
        }

        $next = array_shift($queue);
        file_put_contents($file, json_encode(array_values($queue), JSON_THROW_ON_ERROR));
        $next = is_array($next) ? $next : [];

        $toolCalls = self::toolCalls($next);

        return new CompletionResponse(
            content: is_string($next['content'] ?? null) ? $next['content'] : '',
            model: $this->getDefaultModel(),
            usage: new UsageStatistics(11, 7, 18),
            finishReason: $toolCalls === null ? 'stop' : 'tool_calls',
            provider: self::ADAPTER_TYPE,
            toolCalls: $toolCalls,
        );
    }

    /**
     * @param array<array-key, mixed> $response
     *
     * @return list<ToolCall>|null
     */
    private static function toolCalls(array $response): ?array
    {
        $calls = [];
        foreach (is_array($response['toolCalls'] ?? null) ? $response['toolCalls'] : [] as $index => $call) {
            if (!is_array($call) || !is_string($call['name'] ?? null) || $call['name'] === '') {
                continue;
            }
            $arguments = [];
            foreach (is_array($call['arguments'] ?? null) ? $call['arguments'] : [] as $key => $value) {
                if (is_string($key)) {
                    $arguments[$key] = $value;
                }
            }
            $id = is_string($call['id'] ?? null) && $call['id'] !== '' ? $call['id'] : 'call-' . ((int)$index + 1);
            $calls[] = ToolCall::function($id, $call['name'], $arguments);
        }

        return $calls === [] ? null : $calls;
    }
}
