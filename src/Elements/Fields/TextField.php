<?php

namespace Jankx\Dashboard\Elements\Fields;

if (!defined('ABSPATH')) {
    exit('Cheatin huh?');
}

use Jankx\Dashboard\Elements\Field;
use Jankx\Dashboard\Interfaces\Fields\TextFieldInterface;

class TextField extends Field implements TextFieldInterface
{
    protected $type = 'text';
}
