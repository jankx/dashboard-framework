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
        $this->fields = is_array($fields) ? $fields : [];
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
            'id' => $this->id,
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'description' => $this->description,
            'priority' => $this->priority,
            'icon' => $this->icon,
            'fields' => $this->fields,
        ];
    }

    // ArrayAccess implementation
    public function offsetExists($offset): bool
    {
        return property_exists($this, $offset) || in_array($offset, ['name']);
    }

    public function offsetGet($offset): mixed
    {
        if ($offset === 'name') {
            return $this->title;
        }

        if (property_exists($this, $offset)) {
            return $this->$offset;
        }

        return null;
    }

    public function offsetSet($offset, $value): void
    {
        if (property_exists($this, $offset)) {
            $this->$offset = $value;
        }
    }

    public function offsetUnset($offset): void
    {
        if (property_exists($this, $offset)) {
            $this->$offset = is_array($this->$offset) ? [] : null;
        }
    }
}
