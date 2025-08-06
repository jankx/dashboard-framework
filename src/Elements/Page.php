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
    protected $id;
    protected $title;
    protected $sections;
    protected $icon;

    public function __construct($title, $sections = [], $icon = '')
    {
        $this->title = $title;
        $this->sections = $sections;
        $this->icon = $icon;
        $this->id = sanitize_title($title);
    }

    public function addSection(Section $section)
    {
        $this->sections[] = $section;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function getSubtitle()
    {
        return '';
    }

    public function getDescription()
    {
        return '';
    }

    public function getPriority()
    {
        return 30;
    }

    public function getIcon()
    {
        return $this->icon;
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
