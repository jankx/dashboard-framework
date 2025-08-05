<?php

namespace Jankx\Dashboard\Elements;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

use Jankx\Dashboard\Interfaces\PageInterface;
use JsonSerializable;
use ArrayAccess;

class Page implements PageInterface, JsonSerializable, ArrayAccess
{
    protected $title;
    protected $sections;

    public function __construct($title, $sections = [])
    {
        $this->title = $title;
        $this->sections = $sections;
    }

    public function addSection(Section $section)
    {
        $this->sections[] = $section;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function getSections()
    {
        if (!is_array($this->sections)) {
            return [];
        }
        return $this->sections;
    }

    public function jsonSerialize(): array
    {
        return [
            'title' => $this->title,
            'sections' => $this->sections,
        ];
    }

    // ArrayAccess implementation
    public function offsetExists($offset): bool
    {
        return in_array($offset, ['title', 'sections']);
    }

    public function offsetGet($offset): mixed
    {
        switch ($offset) {
            case 'title':
                return $this->title;
            case 'sections':
                return $this->sections;
            default:
                return null;
        }
    }

    public function offsetSet($offset, $value): void
    {
        switch ($offset) {
            case 'title':
                $this->title = $value;
                break;
            case 'sections':
                $this->sections = $value;
                break;
        }
    }

    public function offsetUnset($offset): void
    {
        switch ($offset) {
            case 'title':
                $this->title = null;
                break;
            case 'sections':
                $this->sections = [];
                break;
        }
    }
}
