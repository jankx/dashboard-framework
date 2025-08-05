<?php

namespace Jankx\Dashboard\Elements\Fields;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

use Jankx\Dashboard\Elements\Field;
use Jankx\Dashboard\Interfaces\Fields\RadioFieldInterface;

class RadioField extends Field implements RadioFieldInterface
{
    protected $type = 'radio';

    public function __construct($id, $title, $args = [])
    {
        parent::__construct($id, $title, $args);

        $this->args = array_merge([
            'options' => [],
            'default' => '',
            'layout' => 'horizontal', // horizontal, vertical
        ], $this->args);
    }

    public function getOptions()
    {
        return $this->args['options'] ?? [];
    }

    public function getDefaultValue()
    {
        return $this->args['default'] ?? '';
    }

    public function getLayout()
    {
        return $this->args['layout'] ?? 'horizontal';
    }
}