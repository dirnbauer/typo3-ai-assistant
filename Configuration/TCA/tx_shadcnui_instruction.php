<?php

declare(strict_types=1);

$ll = 'LLL:EXT:shadcn_ui/Resources/Private/Language/locallang_db.xlf:';

return [
    'ctrl' => [
        'title' => $ll . 'tx_shadcnui_instruction',
        'label' => 'title',
        'descriptionColumn' => 'description',
        'tstamp' => 'tstamp',
        'crdate' => 'crdate',
        'delete' => 'deleted',
        'sortby' => 'sorting',
        'enablecolumns' => [
            'disabled' => 'hidden',
        ],
        'rootLevel' => 1,
        'adminOnly' => true,
        'typeicon_classes' => [
            'default' => 'shadcn-ui-record-instruction',
        ],
        'searchFields' => 'title,body',
    ],
    'types' => [
        '0' => [
            'showitem' => 'title, body, be_groups, --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:access, hidden, description',
        ],
    ],
    'columns' => [
        'title' => [
            'label' => $ll . 'tx_shadcnui_instruction.title',
            'config' => [
                'type' => 'input',
                'size' => 50,
                'max' => 255,
                'required' => true,
            ],
        ],
        'body' => [
            'label' => $ll . 'tx_shadcnui_instruction.body',
            'description' => $ll . 'tx_shadcnui_instruction.body.description',
            'config' => [
                'type' => 'text',
                'rows' => 10,
                'required' => true,
            ],
        ],
        'be_groups' => [
            'label' => $ll . 'tx_shadcnui_instruction.be_groups',
            'description' => $ll . 'tx_shadcnui_instruction.be_groups.description',
            'config' => [
                'type' => 'group',
                'allowed' => 'be_groups',
                'size' => 5,
                'maxitems' => 50,
            ],
        ],
        'description' => [
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_tca.xlf:description',
            'config' => [
                'type' => 'text',
                'rows' => 3,
            ],
        ],
    ],
];
