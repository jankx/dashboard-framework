<?php

namespace Jankx\Dashboard\Elements\Fields;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

use Jankx\Dashboard\Elements\Field;
use Jankx\Dashboard\Interfaces\Fields\ColorFieldInterface;

class ColorField extends Field implements ColorFieldInterface
{
    protected $type = 'color';

    public function __construct($id, $title, $args = [])
    {
        parent::__construct($id, $title, $args);

        // Set default color picker options
        $this->args = array_merge([
            'default' => '#000000',
            'transparent' => false,
            'alpha' => false,
        ], $this->args);
    }

    public function getDefaultColor()
    {
        return $this->args['default'] ?? '#000000';
    }

    public function isTransparent()
    {
        return $this->args['transparent'] ?? false;
    }

    public function hasAlpha()
    {
        return $this->args['alpha'] ?? false;
    }
}