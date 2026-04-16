<?php

namespace Jankx\Dashboard\Elements\Fields;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

use Jankx\Dashboard\Elements\Field;
use Jankx\Dashboard\Interfaces\Fields\MediaFieldInterface;

class MediaField extends Field implements MediaFieldInterface
{
    protected $type = 'media';

    public function __construct($id, $title, $args = [])
    {
        parent::__construct($id, $title, $args);

        $this->args = array_merge([
            'default' => [],
            'url' => true,
            'preview' => true,
            'library' => 'all', // image, video, audio, all
            'multiple' => false,
        ], $this->args);
    }

    public function isMultiple()
    {
        return (bool) ($this->args['multiple'] ?? false);
    }
}
