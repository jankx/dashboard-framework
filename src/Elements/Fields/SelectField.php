<?php

namespace Jankx\Dashboard\Elements\Fields;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

use Jankx\Dashboard\Elements\Field;
use Jankx\Dashboard\Interfaces\Fields\SelectFieldInterface;

class SelectField extends Field implements SelectFieldInterface
{
    protected $type = 'select';

    public function __construct($id, $title, $args = [])
    {
        parent::__construct($id, $title, $args);

        $this->args = array_merge([
            'options' => [],
            'default' => '',
            'multiple' => false,
            'placeholder' => __('Select an option', 'jankx'),
            'searchable' => true,
        ], $this->args);
    }

    public function getOptions()
    {
        return $this->args['options'] ?? [];
    }

    public function isMultiple()
    {
        return (bool) ($this->args['multiple'] ?? false);
    }

    public function isSearchable()
    {
        return (bool) ($this->args['searchable'] ?? true);
    }

    public function getPlaceholder()
    {
        return $this->args['placeholder'] ?? __('Select an option', 'jankx');
    }
}
