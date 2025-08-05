<?php

namespace Jankx\Dashboard\Elements\Fields;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

use Jankx\Dashboard\Elements\Field;
use Jankx\Dashboard\Interfaces\Fields\SpacingFieldInterface;

class SpacingField extends Field implements SpacingFieldInterface
{
    protected $type = 'spacing';

    public function __construct($id, $title, $args = [])
    {
        parent::__construct($id, $title, $args);

        $this->args = array_merge([
            'mode' => 'margin', // margin, padding
            'units' => ['px', 'em', '%'],
            'units_extended' => false,
            'display_units' => true,
            'top' => true,
            'right' => true,
            'bottom' => true,
            'left' => true,
            'all' => false,
            'default' => [
                'top' => '',
                'right' => '',
                'bottom' => '',
                'left' => '',
                'units' => 'px',
            ],
        ], $this->args);
    }

    public function getMode()
    {
        return $this->args['mode'] ?? 'margin';
    }

    public function getUnits()
    {
        return $this->args['units'] ?? ['px', 'em', '%'];
    }

    public function getSpacingOptions()
    {
        return [
            'top' => $this->args['top'] ?? true,
            'right' => $this->args['right'] ?? true,
            'bottom' => $this->args['bottom'] ?? true,
            'left' => $this->args['left'] ?? true,
            'all' => $this->args['all'] ?? false,
        ];
    }

    public function getDefaultValue()
    {
        return $this->args['default'] ?? [];
    }

    public function shouldDisplayUnits()
    {
        return $this->args['display_units'] ?? true;
    }

    public function isUnitsExtended()
    {
        return $this->args['units_extended'] ?? false;
    }
}