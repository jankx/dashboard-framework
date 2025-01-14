<?php

namespace Jankx\Dashboard\Elements;

use Jankx\Dashboard\Interfaces\SectionInterface;
use JsonSerializable;

class Section implements SectionInterface, JsonSerializable
{
    protected $title;
    protected $fields;

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

    public function jsonSerialize(): array
    {
        return [
            'title' => $this->title,
            'fields' => $this->fields,
        ];
    }
}
