<?php

namespace Jankx\Dashboard\Interfaces\Fields;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

interface SwitchFieldInterface
{
    public function getDefaultValue();
    public function getOnText();
    public function getOffText();
    public function getDescription();
}