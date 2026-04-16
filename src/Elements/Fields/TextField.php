<?php

namespace Jankx\Dashboard\Elements\Fields;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

use Jankx\Dashboard\Elements\Field;
use Jankx\Dashboard\Interfaces\Fields\TextFieldInterface;

class TextField extends Field implements TextFieldInterface
{
    protected $type = 'text';

    public function __construct($id, $title, $args = [])
    {
        parent::__construct($id, $title, $args);

        $this->args = array_merge([
            'default' => '',
            'placeholder' => '',
            'readonly' => false,
            'disabled' => false,
            'pattern' => '',
            'maxlength' => '',
            'minlength' => '',
        ], $this->args);
    }

    public function getPlaceholder()
    {
        return $this->args['placeholder'] ?? '';
    }

    public function isReadonly()
    {
        return $this->args['readonly'] ?? false;
    }

    public function isDisabled()
    {
        return $this->args['disabled'] ?? false;
    }
}
