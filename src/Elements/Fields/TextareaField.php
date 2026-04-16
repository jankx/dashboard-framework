<?php

namespace Jankx\Dashboard\Elements\Fields;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

use Jankx\Dashboard\Elements\Field;
use Jankx\Dashboard\Interfaces\Fields\TextareaFieldInterface;

class TextareaField extends Field implements TextareaFieldInterface
{
    protected $type = 'textarea';

    public function __construct($id, $title, $args = [])
    {
        parent::__construct($id, $title, $args);

        $this->args = array_merge([
            'default' => '',
            'placeholder' => '',
            'rows' => 5,
            'readonly' => false,
            'disabled' => false,
        ], $this->args);
    }

    public function getRows()
    {
        return (int) ($this->args['rows'] ?? 5);
    }

    public function getPlaceholder()
    {
        return $this->args['placeholder'] ?? '';
    }
}
