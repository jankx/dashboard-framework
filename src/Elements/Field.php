<?php

namespace Jankx\Dashboard\Elements;

use Jankx\Dashboard\Interfaces\FieldInterface;

class Field implements FieldInterface
{
    public $id;
    public $title;
    public $type;
    public $args;

    public function __construct($id, $title, $type, $args = [])
    {
        $this->id = $id;
        $this->title = $title;
        $this->type = $type;
        $this->args = $args;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getType()
    {
        return $this->type;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function getArgs()
    {
        if ($this->type === 'select') {
            return [
                'options' => [
                    $this->id
                ]
            ];
        }
        return $this->args;
    }
}
