<?php

namespace Jankx\Dashboard\Elements\Fields;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

use Jankx\Dashboard\Elements\Field;
use Jankx\Dashboard\Interfaces\Fields\IconFieldInterface;

class IconField extends Field implements IconFieldInterface
{
    protected $type = 'icon';

    public function __construct($id, $title, $args = [])
    {
        parent::__construct($id, $title, $args);

        $this->args = array_merge([
            'default' => '',
            'libraries' => ['dashicons', 'fontawesome'],
            'search' => true,
            'placeholder' => __('Search icons...', 'jankx'),
        ], $this->args);
    }

    public function getLibraries()
    {
        return $this->args['libraries'] ?? ['dashicons'];
    }

    public function isSearchable()
    {
        return (bool) ($this->args['search'] ?? true);
    }
}