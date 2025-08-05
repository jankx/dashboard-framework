<?php

namespace Jankx\Dashboard\Interfaces\Fields;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

interface CheckboxFieldInterface
{
    public function getDefaultValue();
    public function getDescription();
}