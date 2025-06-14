<?php

namespace Jankx\Dashboard\Interfaces;

if (!defined('ABSPATH')) {
    exit('Cheatin huh?');
}

interface FieldInterface
{
    public function getId();

    public function getType();

    public function getTitle();

    public function getArgs();
}
