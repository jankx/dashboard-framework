<?php

namespace Jankx\Dashboard\Elements\Fields;

use Jankx\Dashboard\Elements\Field;
use Jankx\Dashboard\Interfaces\Fields\ImageFieldInterface;

class ImageField extends Field implements ImageFieldInterface
{
    protected $type = 'image';
}
