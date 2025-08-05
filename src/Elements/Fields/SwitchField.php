<?php

namespace Jankx\Dashboard\Elements\Fields;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

use Jankx\Dashboard\Elements\Field;
use Jankx\Dashboard\Interfaces\Fields\SwitchFieldInterface;

class SwitchField extends Field implements SwitchFieldInterface
{
    protected $type = 'switch';

    public function __construct($id, $title, $args = [])
    {
        parent::__construct($id, $title, $args);

        $this->args = array_merge([
            'default' => false,
            'on' => 'On',
            'off' => 'Off',
            'description' => '',
        ], $this->args);
    }

    public function getDefaultValue()
    {
        return $this->args['default'] ?? false;
    }

    public function getOnText()
    {
        return $this->args['on'] ?? 'On';
    }

    public function getOffText()
    {
        return $this->args['off'] ?? 'Off';
    }

    public function getDescription()
    {
        return $this->args['description'] ?? '';
    }
}