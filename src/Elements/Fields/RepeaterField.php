<?php

namespace Jankx\Dashboard\Elements\Fields;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

use Jankx\Dashboard\Elements\Field;
use Jankx\Dashboard\Interfaces\Fields\RepeaterFieldInterface;

class RepeaterField extends Field implements RepeaterFieldInterface
{
    protected $type = 'repeater';

    public function __construct($id, $title, $args = [])
    {
        parent::__construct($id, $title, $args);

        $this->args = array_merge([
            'fields' => [],
            'default' => [],
            'group_values' => true,
            'add_button' => __('Add Item', 'jankx'),
            'remove_button' => __('Remove', 'jankx'),
            'sortable' => true,
        ], $this->args);
    }

    public function getFields()
    {
        return $this->args['fields'] ?? [];
    }

    public function isSortable()
    {
        return (bool) ($this->args['sortable'] ?? true);
    }

    public function getAddButtonText()
    {
        return $this->args['add_button'] ?? __('Add Item', 'jankx');
    }
}
