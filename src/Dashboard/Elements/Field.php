<?php

namespace Jankx\Dashboard\Elements;

class Field {
    public $id;
    public $title;
    public $type;
    public $args;

    public function __construct($id, $title, $type, $args = []) {
        $this->id = $id;
        $this->title = $title;
        $this->type = $type;
        $this->args = $args;
    }
} 