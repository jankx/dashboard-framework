<?php

namespace Jankx\Dashboard\Elements;

use Jankx\Dashboard\Interfaces\SectionInterface;

class Section implements SectionInterface
{
    public $title;
    public $fields;

    public function __construct($title, $fields = [])
    {
        $this->title = $title;
        $this->fields = $fields;
    }

    public function addField(Field $field)
    {
        $this->fields[] = $field;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function getFields()
    {
        return $this->fields;
    }
}
