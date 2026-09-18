<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider;

return [
    'shadcn-ui-module-chat' => [
        'provider' => SvgIconProvider::class,
        'source' => 'EXT:shadcn_ui/Resources/Public/Icons/module-chat.svg',
    ],
    'shadcn-ui-module-components' => [
        'provider' => SvgIconProvider::class,
        'source' => 'EXT:shadcn_ui/Resources/Public/Icons/module-components.svg',
    ],
    'shadcn-ui-toolbar-chat' => [
        'provider' => SvgIconProvider::class,
        'source' => 'EXT:shadcn_ui/Resources/Public/Icons/toolbar-chat.svg',
    ],
    'shadcn-ui-record-instruction' => [
        'provider' => SvgIconProvider::class,
        'source' => 'EXT:shadcn_ui/Resources/Public/Icons/record-instruction.svg',
    ],
];
