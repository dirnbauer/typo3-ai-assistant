<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Tests\Unit\Chat\Security;

use Netresearch\NrLlm\Service\Tool\ToolAvailabilityServiceInterface;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use TYPO3\CMS\Core\Authentication\BackendUserAuthentication;
use Webconsulting\WebconAiAssistant\Chat\Security\BackendUserContext;
use Webconsulting\WebconAiAssistant\Chat\Security\ToolAccess;

/**
 * Two gates intersect here, and the interesting cases are the ones where they
 * disagree: deny beating allow, and an ABSENT allow list meaning "do not
 * narrow" while an EMPTY one means "allow nothing".
 */
final class ToolAccessTest extends TestCase
{
    protected function tearDown(): void
    {
        unset($GLOBALS['BE_USER']);
        parent::tearDown();
    }

    #[Test]
    public function withoutTsConfigTheGloballyEnabledSetIsOffered(): void
    {
        self::assertSame(
            ['typo3_GetPage', 'typo3_WriteTable'],
            self::access(['typo3_GetPage', 'typo3_WriteTable'], [])->allowedToolNames(),
        );
    }

    #[Test]
    public function anAllowListCanOnlyNarrow(): void
    {
        $access = self::access(
            ['typo3_GetPage', 'typo3_WriteTable', 'read_records'],
            ['allow' => 'typo3_GetPage, read_records, typo3_NotEnabled'],
        );

        self::assertSame(['typo3_GetPage', 'read_records'], $access->allowedToolNames());
    }

    #[Test]
    public function aDenyListRemovesEvenWhatAnAllowListNamed(): void
    {
        $access = self::access(
            ['typo3_GetPage', 'typo3_WriteTable'],
            ['allow' => 'typo3_GetPage,typo3_WriteTable', 'deny' => 'typo3_WriteTable'],
        );

        self::assertSame(['typo3_GetPage'], $access->allowedToolNames());
    }

    #[Test]
    public function anEmptyAllowListAllowsNothingWhileAnAbsentOneAllowsEverything(): void
    {
        self::assertSame(['typo3_GetPage'], self::access(['typo3_GetPage'], [])->allowedToolNames());
        self::assertSame([], self::access(['typo3_GetPage'], ['allow' => ''])->allowedToolNames());
    }

    #[Test]
    public function anUnauthenticatedCallerGetsNoTools(): void
    {
        $access = self::access(['typo3_GetPage'], []);
        unset($GLOBALS['BE_USER']);

        self::assertSame([], $access->allowedToolNames());
    }

    /**
     * @param list<string>          $enabled
     * @param array<string, string> $toolsTsConfig
     */
    private static function access(array $enabled, array $toolsTsConfig): ToolAccess
    {
        $availability = new class ($enabled) implements ToolAvailabilityServiceInterface {
            /** @param list<string> $enabled */
            public function __construct(private readonly array $enabled) {}

            public function enabledNames(): array
            {
                return $this->enabled;
            }

            public function states(): array
            {
                return [];
            }

            public function editorActions(): array
            {
                return [];
            }

            public function groupStates(): array
            {
                return [];
            }
        };

        $user = new class ($toolsTsConfig) extends BackendUserAuthentication {
            /** @param array<string, string> $toolsTsConfig */
            public function __construct(private readonly array $toolsTsConfig)
            {
                parent::__construct();
            }

            /**
             * @return array<string, mixed>
             */
            public function getTSConfig(): array
            {
                return $this->toolsTsConfig === [] ? [] : ['tx_webconaiassistant.' => ['tools.' => $this->toolsTsConfig]];
            }
        };
        $user->user = ['uid' => 7, 'admin' => 0];
        $GLOBALS['BE_USER'] = $user;

        return new ToolAccess($availability, new BackendUserContext());
    }
}
