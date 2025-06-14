<?php

namespace Jankx\Dashboard\Elements\Fields;

if (!defined('ABSPATH')) {
    exit('Cheatin huh?');
}

use Jankx\Dashboard\Elements\Field;
use Jankx\Dashboard\Interfaces\Fields\ImageFieldInterface;

class ImageField extends Field implements ImageFieldInterface
{
    protected $type = 'image';
}
