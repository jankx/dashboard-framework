<?php

namespace Jankx\Dashboard\Elements;

class Page {
    public $title;
    public $sections;

    public function __construct($title, $sections = []) {
        $this->title = $title;
        $this->sections = $sections;
    }

    public function addSection(Section $section) {
        $this->sections[] = $section;
    }
} 