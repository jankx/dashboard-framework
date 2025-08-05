<?php

namespace Jankx\Dashboard\Interfaces\Fields;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

interface SliderFieldInterface
{
    public function getMin();
    public function getMax();
    public function getStep();
    public function getDefaultValue();
    public function shouldDisplayValue();
    public function getResolution();
}