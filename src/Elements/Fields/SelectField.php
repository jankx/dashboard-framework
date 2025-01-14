<?php

namespace Jankx\Dashboard\Elements\Fields;

use Jankx\Dashboard\Elements\Field;
use Jankx\Dashboard\Interfaces\Fields\SelectFieldInterface;

class SelectField extends Field implements SelectFieldInterface
{
    protected $type = 'select';

    public function getArgs()
    {
        return [
            'options' => [
                $this->id
            ]
        ];
    }
}
