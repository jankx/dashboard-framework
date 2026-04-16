<?php

namespace Jankx\Dashboard\Elements\Fields;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

use Jankx\Dashboard\Elements\Field;
use Jankx\Dashboard\Interfaces\Fields\SocialProfilesFieldInterface;

class SocialProfilesField extends Field implements SocialProfilesFieldInterface
{
    protected $type = 'social_profiles';

    public function __construct($id, $title, $args = [])
    {
        parent::__construct($id, $title, $args);

        $this->args = array_merge([
            'default' => [],
            'sortable' => true,
            'cloneable' => true,
            'max' => false,
            'presets' => [
                'facebook'  => ['label' => 'Facebook', 'icon' => 'dashicons-facebook'],
                'twitter'   => ['label' => 'Twitter', 'icon' => 'dashicons-twitter'],
                'instagram' => ['label' => 'Instagram', 'icon' => 'dashicons-camera'],
                'youtube'   => ['label' => 'YouTube', 'icon' => 'dashicons-youtube'],
                'linkedin'  => ['label' => 'LinkedIn', 'icon' => 'dashicons-linkedin'],
                'pinterest' => ['label' => 'Pinterest', 'icon' => 'dashicons-pinterest'],
            ]
        ], $this->args);
    }

    public function isSortable()
    {
        return $this->args['sortable'] ?? true;
    }

    public function isCloneable()
    {
        return $this->args['cloneable'] ?? true;
    }

    public function getMax()
    {
        return $this->args['max'] ?? false;
    }

    public function getPresets()
    {
        return $this->args['presets'] ?? [];
    }
}
