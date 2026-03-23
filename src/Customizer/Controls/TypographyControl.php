<?php

namespace Jankx\Dashboard\Customizer\Controls;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

/**
 * Typography Control for WordPress Customizer
 */
class TypographyControl extends \WP_Customize_Control
{
    public $type = 'jankx-typography';

    public function render_content()
    {
        ?>
        <div class="jankx-typography-control-container" id="jankx-typography-wrapper-<?php echo esc_attr($this->id); ?>">
            
            <?php if (!empty($this->label)) : ?>
                <span class="customize-control-title"><?php echo esc_html($this->label); ?></span>
            <?php endif; ?>

            <?php if (!empty($this->description)) : ?>
                <span class="description customize-control-description"><?php echo esc_html($this->description); ?></span>
            <?php endif; ?>
            
            <div class="jankx-typography-mount-point" id="jankx-typography-mount-<?php echo esc_attr($this->id); ?>">
                <!-- React will mount here -->
            </div>
        </div>
        <?php
    }
}
