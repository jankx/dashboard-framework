<?php

namespace Jankx\Dashboard\Factories;

use Jankx\Dashboard\Elements\Field;
use Jankx\Dashboard\Elements\Fields\TextareaField;
use Jankx\Dashboard\Elements\Fields\TextField;

class FieldFactory
{
    protected static function createTextField($id, $title, $args)
    {
        $textField = new TextField($id, $title, $args);

        return $textField;
    }


    /**
     * Summary of create field
     *
     * @param mixed $id
     * @param mixed $title
     * @param mixed $type
     * @param mixed $args
     * @return \Jankx\Dashboard\Elements\Field|null
     */
    public static function create($id, $title, $type, $args)
    {
        switch ($type) {
            case 'text':
            case 'input':
                return static::createTextField($id, $title, $args);

            case 'textarea':
                return static::createTextareaField($id, $title, $args);
        }

        return null;
    }

    protected static function createTextareaField($id, $title, $args)
    {
        $textareaField = new TextareaField($id, $title, $args);

        return $textareaField;
    }
}
