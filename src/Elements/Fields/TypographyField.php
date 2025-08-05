<?php

namespace Jankx\Dashboard\Elements\Fields;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

use Jankx\Dashboard\Elements\Field;
use Jankx\Dashboard\Interfaces\Fields\TypographyFieldInterface;

class TypographyField extends Field implements TypographyFieldInterface
{
    protected $type = 'typography';

    public function __construct($id, $title, $args = [])
    {
        parent::__construct($id, $title, $args);

        $this->args = array_merge([
            'font-family' => true,
            'font-size' => true,
            'font-weight' => true,
            'font-style' => true,
            'line-height' => true,
            'letter-spacing' => true,
            'text-align' => true,
            'text-transform' => true,
            'color' => true,
            'google' => true,
            'font-backup' => false,
            'text-shadow' => false,
            'preview' => true,
            'preview_text' => 'The quick brown fox jumps over the lazy dog',
            'preview_font_size' => '40px',
            'subsets' => true,
            'font-size-units' => ['px', 'em', '%'],
            'default' => [
                'font-family' => '',
                'font-size' => '',
                'font-weight' => '',
                'font-style' => '',
                'line-height' => '',
                'letter-spacing' => '',
                'text-align' => '',
                'text-transform' => '',
                'color' => '',
            ],
        ], $this->args);
    }

    public function getTypographyOptions()
    {
        return [
            'font-family' => $this->args['font-family'] ?? true,
            'font-size' => $this->args['font-size'] ?? true,
            'font-weight' => $this->args['font-weight'] ?? true,
            'font-style' => $this->args['font-style'] ?? true,
            'line-height' => $this->args['line-height'] ?? true,
            'letter-spacing' => $this->args['letter-spacing'] ?? true,
            'text-align' => $this->args['text-align'] ?? true,
            'text-transform' => $this->args['text-transform'] ?? true,
            'color' => $this->args['color'] ?? true,
        ];
    }

    public function getDefaultValue()
    {
        return $this->args['default'] ?? [];
    }

    public function isGoogleFontsEnabled()
    {
        return $this->args['google'] ?? true;
    }

    public function getPreviewText()
    {
        return $this->args['preview_text'] ?? 'The quick brown fox jumps over the lazy dog';
    }

    public function getFontSizeUnits()
    {
        return $this->args['font-size-units'] ?? ['px', 'em', '%'];
    }
}