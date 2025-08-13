<?php

namespace Jankx\Dashboard\Elements;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

use Jankx\Dashboard\Interfaces\FieldInterface;
use Jankx\Adapter\Options\Interfaces\Field as OptionsFieldInterface;
use JsonSerializable;
use ArrayAccess;

abstract class Field implements FieldInterface, OptionsFieldInterface, JsonSerializable, ArrayAccess
{
    protected $id;
    protected $title;
    protected $type;
    protected $args;

    public function __construct($id, $title, $args = [])
    {
        $this->id = $id;
        $this->title = $title;
        $this->args = $args;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getType()
    {
        return $this->type;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function getSubtitle()
    {
        return $this->args['subtitle'] ?? '';
    }

    public function getDescription()
    {
        return $this->args['description'] ?? '';
    }

    public function getDefault()
    {
        return $this->args['default'] ?? '';
    }

    public function getPriority()
    {
        return $this->args['priority'] ?? 30;
    }

    public function getIcon()
    {
        return $this->args['icon'] ?? '';
    }

    public function hasOptions()
    {
        return isset($this->args['options']) && !empty($this->args['options']);
    }

    public function getOptions()
    {
        return $this->args['options'] ?? [];
    }

    public function hasMin()
    {
        return isset($this->args['min']);
    }

    public function getMin()
    {
        return $this->args['min'] ?? null;
    }

    public function hasMax()
    {
        return isset($this->args['max']);
    }

    public function getMax()
    {
        return $this->args['max'] ?? null;
    }

    public function hasStep()
    {
        return isset($this->args['step']);
    }

    public function getStep()
    {
        return $this->args['step'] ?? null;
    }

    public function isWordPressNative()
    {
        return $this->args['wordpress_native'] ?? false;
    }

    public function getOptionName()
    {
        return $this->args['option_name'] ?? '';
    }

    public function hasSubFields()
    {
        return isset($this->args['fields']) && !empty($this->args['fields']);
    }

    public function getSubFields()
    {
        return $this->args['fields'] ?? [];
    }

    public function getArgs()
    {
        return $this->args;
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'type' => $this->type,
            'args' => $this->args,
        ];
    }

    // ArrayAccess implementation
    public function offsetExists($offset): bool
    {
        return in_array($offset, ['id', 'title', 'type', 'args']);
    }

    public function offsetGet($offset): mixed
    {
        switch ($offset) {
            case 'id':
                return $this->id;
            case 'title':
                return $this->title;
            case 'type':
                return $this->type;
            case 'args':
                return $this->args;
            default:
                return null;
        }
    }

    public function offsetSet($offset, $value): void
    {
        switch ($offset) {
            case 'id':
                $this->id = $value;
                break;
            case 'title':
                $this->title = $value;
                break;
            case 'type':
                $this->type = $value;
                break;
            case 'args':
                $this->args = $value;
                break;
        }
    }

    public function offsetUnset($offset): void
    {
        switch ($offset) {
            case 'id':
                $this->id = null;
                break;
            case 'title':
                $this->title = null;
                break;
            case 'type':
                $this->type = null;
                break;
            case 'args':
                $this->args = [];
                break;
        }
    }
}
