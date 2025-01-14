<?php

namespace Jankx\Dashboard\Elements;

use Jankx\Dashboard\Interfaces\PageInterface;

class Page implements PageInterface
{
    public $title;
    public $sections;

    public function __construct($title, $sections = [])
    {
        $this->title = $title;
        $this->sections = $sections;
    }

    public function addSection(Section $section)
    {
        $this->sections[] = $section;
    }
}
