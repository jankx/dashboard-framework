<?php

namespace Jankx\Dashboard\Elements;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

use Jankx\Dashboard\Interfaces\SectionInterface;
use JsonSerializable;
use ArrayAccess;

class Section implements SectionInterface, JsonSerializable, ArrayAccess
{
    protected $id;
    protected $title;
    protected $fields;

    public function __construct($title, $fields = [])
    {
        $this->title = $title;
        $this->fields = $fields;
        $this->id = sanitize_title($title);
    }

    public function addField(Field $field)
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
