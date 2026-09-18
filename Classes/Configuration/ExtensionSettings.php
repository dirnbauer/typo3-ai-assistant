<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Configuration;

use Throwable;
use TYPO3\CMS\Core\Configuration\ExtensionConfiguration;

/**
 * Typed reader for `ext_conf_template.txt`.
 *
 * TYPO3 stores every value as a string; the defaults stated here are the same
 * ones the template declares, so a fresh install and an installation that never
 * saved the form read the same numbers.
 */
final class ExtensionSettings
{
    public const EXTENSION_KEY = 'shadcn_ui';

    /** @var array<string, mixed> */
    private readonly array $values;

    public function __construct(ExtensionConfiguration $extensionConfiguration)
    {
        try {
            $raw = $extensionConfiguration->get(self::EXTENSION_KEY);
        } catch (Throwable) {
            $raw = [];
        }

        $values = [];
        if (is_array($raw)) {
            foreach ($raw as $key => $value) {
                if (is_string($key)) {
                    $values[$key] = $value;
                }
            }
        }
        $this->values = $values;
    }

    /**
     * The nr-llm configuration identifier the chat runs under.
     */
    public function llmConfiguration(): string
    {
        $identifier = trim($this->string('llmConfiguration'));

        return $identifier !== '' ? $identifier : 'backend-assistant';
    }

    /**
     * Whether a conversation may skip the approval pause for permitted write
     * tools when it also asked to (`auto_approve_tools`). Off means every write
     * stops and asks, whatever the conversation says.
     */
    public function allowWrites(): bool
    {
        return $this->bool('allowWrites', false);
    }

    /**
     * Turns one backend user may start per hour across all conversations.
     * 0 disables the limit.
     */
    public function maxTurnsPerHour(): int
    {
        return max(0, $this->int('maxTurnsPerHour', 60));
    }

    /**
     * FAL combined identifier of the folder attachments are stored below,
     * always with a trailing slash so callers can append segments.
     */
    public function attachmentStorage(): string
    {
        $folder = trim($this->string('attachmentStorage'));

        return rtrim($folder !== '' ? $folder : '1:/shadcn_ui/', '/') . '/';
    }

    /**
     * Whether the toolbar button and its floating panel are offered at all.
     */
    public function panelEnabled(): bool
    {
        return $this->bool('panelEnabled', true);
    }

    private function int(string $key, int $default): int
    {
        $value = $this->values[$key] ?? null;

        return is_numeric($value) ? (int)$value : $default;
    }

    private function bool(string $key, bool $default): bool
    {
        $value = $this->values[$key] ?? null;
        if ($value === null || $value === '') {
            return $default;
        }

        return is_scalar($value) && (string)$value === '1';
    }

    private function string(string $key): string
    {
        $value = $this->values[$key] ?? '';

        return is_scalar($value) ? (string)$value : '';
    }
}
