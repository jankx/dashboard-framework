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
            'description' => '',
        ], $this->args);
    }

    public function getDefaultValue()
    {
        return $this->args['default'] ?? false;
    }

    public function getDescription()
    {
        return $this->args['description'] ?? '';
    }
}