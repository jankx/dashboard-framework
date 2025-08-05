<?php

namespace Jankx\Dashboard\Elements\Fields;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

use Jankx\Dashboard\Elements\Field;
use Jankx\Dashboard\Interfaces\Fields\SliderFieldInterface;

class SliderField extends Field implements SliderFieldInterface
{
    protected $type = 'slider';

    public function __construct($id, $title, $args = [])
    {
        parent::__construct($id, $title, $args);

        $this->args = array_merge([
            'min' => 0,
            'max' => 100,
            'step' => 1,
            'default' => 0,
            'display_value' => true,
            'resolution' => 1,
        ], $this->args);
    }

    public function getMin()
    {
        return $this->args['min'] ?? 0;
    }

    public function getMax()
    {
        return $this->args['max'] ?? 100;
    }

    public function getStep()
    {
        return $this->args['step'] ?? 1;
    }

    public function getDefaultValue()
    {
        return $this->args['default'] ?? 0;
    }

    public function shouldDisplayValue()
    {
        return $this->args['display_value'] ?? true;
    }

    public function getResolution()
    {
        return $this->args['resolution'] ?? 1;
    }
}