<?php

namespace Jankx\Dashboard\Interfaces\Fields;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

interface RadioFieldInterface
{
    public function getOptions();
    public function getDefaultValue();
    public function getLayout();
}