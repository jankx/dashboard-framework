<?php

namespace Jankx\Dashboard\Interfaces\Fields;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

interface SpacingFieldInterface
{
    public function getMode();
    public function getUnits();
    public function getSpacingOptions();
    public function getDefaultValue();
    public function shouldDisplayUnits();
    public function isUnitsExtended();
}