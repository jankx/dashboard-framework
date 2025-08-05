<?php

namespace Jankx\Dashboard\Interfaces\Fields;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

interface ColorFieldInterface
{
    public function getDefaultColor();
    public function isTransparent();
    public function hasAlpha();
}