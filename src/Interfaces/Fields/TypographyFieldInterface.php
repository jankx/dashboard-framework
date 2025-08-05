<?php

namespace Jankx\Dashboard\Interfaces\Fields;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

interface TypographyFieldInterface
{
    public function getTypographyOptions();
    public function getDefaultValue();
    public function isGoogleFontsEnabled();
    public function getPreviewText();
    public function getFontSizeUnits();
}