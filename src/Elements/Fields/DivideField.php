<?php

namespace Jankx\Dashboard\Elements\Fields;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

use Jankx\Dashboard\Elements\Field;
use Jankx\Dashboard\Interfaces\Fields\DivideFieldInterface;

class DivideField extends Field implements DivideFieldInterface
{
    protected $type = 'divide';

    public function __construct($id, $title, $args = [])
    {
        parent::__construct($id, $title, $args);

        $this->args = array_merge([
            'default' => '',
            'width' => '100%',
            'height' => '1px',
            'style' => 'solid',
            'color' => '#e2e8f0',
            'margin' => '20px 0',
        ], $this->args);
    }

    public function getWidth()
    {
        return $this->args['width'] ?? '100%';
    }

    public function getHeight()
    {
        return $this->args['height'] ?? '1px';
    }

    public function getStyle()
    {
        return $this->args['style'] ?? 'solid';
    }

    public function getColor()
    {
        return $this->args['color'] ?? '#e2e8f0';
    }

    public function getMargin()
    {
        return $this->args['margin'] ?? '20px 0';
    }
}
