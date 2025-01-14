<?php

namespace Jankx\Dashboard\Elements;

use Jankx\Dashboard\Interfaces\FieldInterface;

abstract class Field implements FieldInterface
{
    protected $id;
    protected $title;
    protected $type;
    protected $args;


    public function __construct($id, $title, $args = [])
    {
        $this->id = $id;
        $this->title = $title;
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
        return $this->args;
    }
}
