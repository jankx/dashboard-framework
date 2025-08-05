<?php

namespace Jankx\Dashboard\Elements\Fields;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

use Jankx\Dashboard\Elements\Field;
use Jankx\Dashboard\Interfaces\Fields\BackgroundFieldInterface;

class BackgroundField extends Field implements BackgroundFieldInterface
{
    protected $type = 'background';

    public function __construct($id, $title, $args = [])
    {
        parent::__construct($id, $title, $args);

        $this->args = array_merge([
            'background-color' => true,
            'background-repeat' => true,
            'background-attachment' => true,
            'background-position' => true,
            'background-image' => true,
            'background-clip' => false,
            'background-origin' => false,
            'background-size' => true,
            'preview_media' => true,
            'preview' => true,
            'preview_height' => '200px',
            'transparent' => true,
            'default' => [
                'background-color' => '',
                'background-repeat' => '',
                'background-attachment' => '',
                'background-position' => '',
                'background-image' => '',
                'background-clip' => '',
                'background-origin' => '',
                'background-size' => '',
            ],
        ], $this->args);
    }

    public function getBackgroundOptions()
    {
        return [
            'background-color' => $this->args['background-color'] ?? true,
            'background-repeat' => $this->args['background-repeat'] ?? true,
            'background-attachment' => $this->args['background-attachment'] ?? true,
            'background-position' => $this->args['background-position'] ?? true,
            'background-image' => $this->args['background-image'] ?? true,
            'background-clip' => $this->args['background-clip'] ?? false,
            'background-origin' => $this->args['background-origin'] ?? false,
            'background-size' => $this->args['background-size'] ?? true,
        ];
    }

    public function getDefaultValue()
    {
        return $this->args['default'] ?? [];
    }

    public function isTransparentEnabled()
    {
        return $this->args['transparent'] ?? true;
    }

    public function getPreviewHeight()
    {
        return $this->args['preview_height'] ?? '200px';
    }
}