<?php

namespace Jankx\Dashboard\Interfaces\Fields;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

interface BackgroundFieldInterface
{
    public function getBackgroundOptions();
    public function getDefaultValue();
    public function isTransparentEnabled();
    public function getPreviewHeight();
}