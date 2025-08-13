<?php

namespace Jankx\Dashboard\Elements;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

use Jankx\Dashboard\Interfaces\SectionInterface;
use Jankx\Adapter\Options\Interfaces\Section as OptionsSectionInterface;
use JsonSerializable;
use ArrayAccess;

class Section implements SectionInterface, OptionsSectionInterface, JsonSerializable, ArrayAccess
{
    protected $id;
    protected $title;
    protected $subtitle;
    protected $description;
    protected $priority;
    protected $icon;
    protected $fields;

    public function __construct($title, $fields = [])
    {
        $this->title = $title;
        $this->fields = $fields;
        $this->id = sanitize_title($title);
        $this->subtitle = '';
        $this->description = '';
        $this->priority = 30;
        $this->icon = '';
    }

    public function addField($field)
    {
        $this->fields[] = $field;
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
        return $this->subtitle;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function getPriority()
    {
        return $this->priority;
    }

    public function getIcon()
    {
        return $this->icon;
    }

    public function setIcon($icon)
    {
        $this->icon = $icon;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function setSubtitle($subtitle)
    {
        $this->subtitle = $subtitle;
    }

    public function setDescription($description)
    {
        $this->description = $description;
    }

    public function setPriority($priority)
    {
        $this->priority = $priority;
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

    // ArrayAccess implementation
    public function offsetExists($offset): bool
    {
        return in_array($offset, ['title', 'fields']);
    }

    public function offsetGet($offset): mixed
    {
        switch ($offset) {
            case 'title':
                return $this->title;
            case 'fields':
                return $this->fields;
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
            case 'fields':
                $this->fields = $value;
                break;
        }
    }

    public function offsetUnset($offset): void
    {
        switch ($offset) {
            case 'title':
                $this->title = null;
                break;
            case 'fields':
                $this->fields = [];
                break;
        }
    }
}
