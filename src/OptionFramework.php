<?php

namespace Jankx\Dashboard;

class OptionFramework {
    private $instance_name;
    private $page_title;
    private $menu_text;

    public function __construct($instance_name = 'jankx_theme', $page_title = 'Tùy Chọn Theme Jankx', $menu_text = 'Tùy Chọn') {
        $this->instance_name = $instance_name;
        $this->page_title = $page_title;
        $this->menu_text = $menu_text;
        add_action('admin_menu', [$this, 'addOptionsPage']);
        add_action('admin_init', [$this, 'registerSettings']);
    }

    public function addOptionsPage() {
        add_theme_page($this->page_title, $this->menu_text, 'manage_options', "{$this->instance_name}-options", [$this, 'renderOptionsPage']);
    }

    public function renderOptionsPage() {
        ?>
        <div class="wrap">
            <h1><?php echo esc_html($this->page_title); ?></h1>
            <form method="post" action="options.php">
                <?php
                settings_fields("{$this->instance_name}_options_group");
                do_settings_sections("{$this->instance_name}_options_group");
                ?>
                <table class="form-table">
                    <tr valign="top">
                        <th scope="row">URL Logo</th>
                        <td><input type="text" name="{$this->instance_name}_logo_url" value="<?php echo esc_attr(get_option("{$this->instance_name}_logo_url")); ?>" /></td>
                    </tr>
                    <tr valign="top">
                        <th scope="row">Màu Nền</th>
                        <td><input type="text" name="{$this->instance_name}_background_color" value="<?php echo esc_attr(get_option("{$this->instance_name}_background_color")); ?>" /></td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>
        </div>
        <?php
    }

    public function registerSettings() {
        register_setting("{$this->instance_name}_options_group", "{$this->instance_name}_logo_url");
        register_setting("{$this->instance_name}_options_group", "{$this->instance_name}_background_color");
    }
}