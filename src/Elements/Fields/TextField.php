<?php

namespace Jankx\Dashboard\Elements\Fields;

use Jankx\Dashboard\Elements\Field;
use Jankx\Dashboard\Interfaces\Fields\TextFieldInterface;

class TextField extends Field implements TextFieldInterface
{
    protected $type = 'text';
}
