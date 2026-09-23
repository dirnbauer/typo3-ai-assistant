<?php

declare(strict_types=1);

$ll = 'LLL:EXT:webcon_ai_assistant/Resources/Private/Language/locallang_db.xlf:';

return [
    'ctrl' => [
        'title' => $ll . 'tx_webconaiassistant_instruction',
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
            'default' => 'webcon-ai-assistant-record-instruction',
        ],
    ],
    'types' => [
        '0' => [
            'showitem' => 'title, body, be_groups, --div--;core.form.tabs:access, hidden, --div--;core.form.tabs:notes, description',
        ],
    ],
    'columns' => [
        'title' => [
            'label' => $ll . 'tx_webconaiassistant_instruction.title',
            'config' => [
                'type' => 'input',
                'size' => 50,
                'max' => 255,
                'required' => true,
            ],
        ],
        'body' => [
            'label' => $ll . 'tx_webconaiassistant_instruction.body',
            'description' => $ll . 'tx_webconaiassistant_instruction.body.description',
            'config' => [
                'type' => 'text',
                'rows' => 10,
                'required' => true,
            ],
        ],
        'be_groups' => [
            'label' => $ll . 'tx_webconaiassistant_instruction.be_groups',
            'description' => $ll . 'tx_webconaiassistant_instruction.be_groups.description',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectMultipleSideBySide',
                'foreign_table' => 'be_groups',
                'foreign_table_where' => 'ORDER BY be_groups.title',
                'size' => 6,
                'maxitems' => 50,
            ],
        ],
        'description' => [
            'label' => 'core.db.general:description',
            'config' => [
                'type' => 'text',
                'rows' => 3,
                // An editor's note to other editors, not part of the prompt:
                // finding an instruction by it would be finding the wrong thing.
                'searchable' => false,
            ],
        ],
    ],
];
