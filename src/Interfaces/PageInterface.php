<?php

namespace Jankx\Dashboard\Interfaces;

if (!defined('ABSPATH')) {
    exit('Cheatin huh?');
}

interface PageInterface
{
    public function getTitle();
}
