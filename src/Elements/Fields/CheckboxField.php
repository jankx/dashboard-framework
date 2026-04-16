<?php

namespace Jankx\Dashboard\Elements\Fields;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

use Jankx\Dashboard\Elements\Field;
use Jankx\Dashboard\Interfaces\Fields\CheckboxFieldInterface;

class CheckboxField extends Field implements CheckboxFieldInterface
{
    protected $type = 'checkbox';

    public function __construct($id, $title, $args = [])
    {
        parent::__construct($id, $title, $args);

        $this->args = array_merge([
            'default' => false,
            'options' => [], // If provided, behaves like a group of checkboxes
            'description' => '',
            'layout' => 'horizontal', // horizontal, vertical
        ], $this->args);
    }

    public function hasOptions()
    {
        return !empty($this->args['options']);
    }

    public function getOptions()
    {
        return $this->args['options'] ?? [];
    }

    public function getDefaultValue()
    {
        return $this->args['default'] ?? ($this->hasOptions() ? [] : false);
    }
}