<?php

namespace Jankx\Dashboard\Elements;

class Section {
    public $title;
    public $fields;

    public function __construct($title, $fields = []) {
        $this->title = $title;
        $this->fields = $fields;
    }

    public function addField(Field $field) {
        $this->fields[] = $field;
    }
}