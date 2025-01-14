<?php

namespace Jankx\Dashboard\Interfaces;

interface FieldInterface
{
    public function getId();

    public function getType();

    public function getTitle();

    public function getArgs();
}
