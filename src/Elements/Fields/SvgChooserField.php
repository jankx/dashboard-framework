<?php

namespace Jankx\Dashboard\Elements\Fields;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

use Jankx\Dashboard\Elements\Field;

/**
 * SVG Chooser Field - Visual preset/layout picker
 *
 * Options format:
 * [
 *   'value_key' => [
 *     'label'   => 'Layout Name',
 *     'svg'     => '<svg>...</svg>',   // raw SVG string
 *     'svg_url' => 'path/to/icon.svg', // OR a URL to an SVG file
 *   ],
 *   ...
 * ]
 */
class SvgChooserField extends Field
{
    protected $type = 'svg_chooser';

    public function __construct($id, $title, $args = [])
    {
        parent::__construct($id, $title, $args);

        $this->args = array_merge([
            'options'     => [],   // associative array: value => ['label', 'svg'|'svg_url']
            'default'     => '',
            'columns'     => 3,    // number of columns in the grid
            'show_labels' => true, // show text labels below each option
        ], $this->args);
    }

    public function getOptions(): array
    {
        return $this->args['options'] ?? [];
    }

    public function getDefaultValue(): string
    {
        return $this->args['default'] ?? '';
    }

    public function getColumns(): int
    {
        return (int) ($this->args['columns'] ?? 3);
    }

    public function showLabels(): bool
    {
        return (bool) ($this->args['show_labels'] ?? true);
    }
}
