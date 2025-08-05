<?php

namespace Jankx\Dashboard\Factories;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

use Jankx\Dashboard\Elements\Fields\SelectField;
use Jankx\Dashboard\Elements\Fields\TextareaField;
use Jankx\Dashboard\Elements\Fields\TextField;
use Jankx\Dashboard\Elements\Fields\ImageField;
use Jankx\Dashboard\Elements\Fields\IconField;
use Jankx\Dashboard\Elements\Fields\ColorField;
use Jankx\Dashboard\Elements\Fields\CheckboxField;
use Jankx\Dashboard\Elements\Fields\RadioField;
use Jankx\Dashboard\Elements\Fields\SwitchField;
use Jankx\Dashboard\Elements\Fields\SliderField;
use Jankx\Dashboard\Elements\Fields\TypographyField;
use Jankx\Dashboard\Elements\Fields\BackgroundField;
use Jankx\Dashboard\Elements\Fields\SpacingField;

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

            case 'select':
            case 'dropdown':
            case 'option':
                return static::createSelectField($id, $title, $args);

            case 'image':
                return static::createImageField($id, $title, $args);

            case 'icon':
                return static::createIconField($id, $title, $args);

            case 'color':
            case 'color_picker':
                return static::createColorField($id, $title, $args);

            case 'checkbox':
                return static::createCheckboxField($id, $title, $args);

            case 'radio':
                return static::createRadioField($id, $title, $args);

            case 'switch':
            case 'button_set':
                return static::createSwitchField($id, $title, $args);

            case 'slider':
                return static::createSliderField($id, $title, $args);

            case 'typography':
                return static::createTypographyField($id, $title, $args);

            case 'background':
                return static::createBackgroundField($id, $title, $args);

            case 'spacing':
            case 'dimensions':
                return static::createSpacingField($id, $title, $args);
        }

        return null;
    }

    protected static function createTextareaField($id, $title, $args)
    {
        $textareaField = new TextareaField($id, $title, $args);

        return $textareaField;
    }

    protected static function createSelectField($id, $title, $args)
    {
        $selectField = new SelectField($id, $title, $args);

        return $selectField;
    }

    protected static function createImageField($id, $title, $args)
    {
        return new ImageField($id, $title, $args);
    }

    protected static function createIconField($id, $title, $args)
    {
        return new IconField($id, $title, $args);
    }

    protected static function createColorField($id, $title, $args)
    {
        return new ColorField($id, $title, $args);
    }

    protected static function createCheckboxField($id, $title, $args)
    {
        return new CheckboxField($id, $title, $args);
    }

    protected static function createRadioField($id, $title, $args)
    {
        return new RadioField($id, $title, $args);
    }

    protected static function createSwitchField($id, $title, $args)
    {
        return new SwitchField($id, $title, $args);
    }

    protected static function createSliderField($id, $title, $args)
    {
        return new SliderField($id, $title, $args);
    }

    protected static function createTypographyField($id, $title, $args)
    {
        return new TypographyField($id, $title, $args);
    }

    protected static function createBackgroundField($id, $title, $args)
    {
        return new BackgroundField($id, $title, $args);
    }

    protected static function createSpacingField($id, $title, $args)
    {
        return new SpacingField($id, $title, $args);
    }
}
