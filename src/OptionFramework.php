<?php

namespace Jankx\Dashboard;

class OptionFramework
{
    private $instance_name;
    private $page_title;
    private $menu_text;
    private $sections = [];

    public function __construct($instance_name = 'jankx_theme', $page_title = 'Tùy Chọn Theme Jankx', $menu_text = 'Tùy Chọn')
    {
        $this->instance_name = $instance_name;
        $this->page_title = $page_title;
        $this->menu_text = $menu_text;

        add_action('admin_menu', [$this, 'addOptionsPage']);
        add_action('admin_enqueue_scripts', [$this, 'enqueueScripts']);
    }

    public function addSection($section_id, $section_title)
    {
        $this->sections[$section_id] = [
            'title' => $section_title,
            'fields' => []
        ];
    }

    public function addField($section_id, $field_id, $field_title, $field_type, $args = [])
    {
        if (isset($this->sections[$section_id])) {
            $this->sections[$section_id]['fields'][$field_id] = [
                'title' => $field_title,
                'type' => $field_type,
                'args' => $args
            ];
        }
    }

    public function addOptionsPage()
    {
        add_menu_page(
            $this->page_title,
            $this->menu_text,
            'manage_options',
            "{$this->instance_name}-options",
            [$this, 'renderOptionsPage']
        );
    }

    public function renderOptionsPage()
    {
        ?>
        <div id="option-framework-app"></div>
        <script type="text/javascript">
            const optionsData = <?php echo json_encode($this->sections); ?>;
            const instanceName = '<?php echo esc_js($this->instance_name); ?>';
        </script>
        <?php
    }

    public function enqueueScripts()
    {
        // /Users/puleeno/Projects/xanhvina.com/wp-content/themes/xanhvina/vendor/jankx/dashboard-framework/src/OptionFramework.php
        wp_enqueue_script('react-app', get_template_directory_uri() . '/vendor/jankx/dashboard-framework/dist/bundle.js', ['wp-element'], null, true);
    }

    public function saveOptions($data)
    {
        update_option($this->instance_name, json_encode($data));
    }
}