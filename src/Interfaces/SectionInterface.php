<?php

namespace Jankx\Dashboard\Interfaces;

if (!defined('ABSPATH')) {
    exit('Cheatin huh?');
}

interface SectionInterface
{
    public function getTitle();
}
