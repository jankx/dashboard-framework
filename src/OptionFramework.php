<?php

namespace Jankx\Dashboard;

use Jankx\Dashboard\Elements\Page;

class OptionFramework
{
    private $instance_name;
    private $page_title;
    private $menu_text;
    public $pages = []; // Chứa các pages

    public function __construct($instance_name, $page_title = 'Tùy Chọn Theme Jankx', $menu_text = 'Tùy Chọn')
    {
        $this->instance_name = $instance_name;
        $this->page_title = $page_title;
        $this->menu_text = $menu_text;

        add_action('admin_menu', [$this, 'addOptionsPage']);
        add_action('admin_enqueue_scripts', [$this, 'enqueueScripts']);
        add_action('wp_ajax_save_options', [$this, 'saveOptions']);
        add_action('wp_ajax_fetch_options', [$this, 'fetchOptions']);
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
        $nonce = wp_create_nonce('save_options_nonce');

        // Truyền dữ liệu sang JavaScript
        wp_localize_script('react-app', 'optionsData', $this->pages);
        wp_localize_script('react-app', 'jankxOptionAjax', [
            'ajaxurl' => admin_url('admin-ajax.php'),
            'nonce' => $nonce
        ]);

        ?>
        <div id="option-framework-app"></div>
        <script type="text/javascript">
            const instanceName = '<?php echo esc_js($this->instance_name); ?>';
        </script>
        <?php
    }

    public function enqueueScripts()
    {
        wp_enqueue_script('react-app', get_template_directory_uri() . '/vendor/jankx/dashboard-framework/dist/bundle.js?v=1.0.1.17', ['wp-element'], null, true);
    }

    public function saveOptions()
    {
        if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'save_options_nonce')) {
            wp_send_json_error('Nonce không hợp lệ');
            return;
        }

        $data = json_decode(file_get_contents('php://input'), true);
        $data = json_decode($data['data'], true);

        if (is_array($data)) {
            update_option($this->instance_name, json_encode($data));
            wp_send_json_success();
        } else {
            wp_send_json_error('Dữ liệu không hợp lệ');
        }
    }

    public function fetchOptions()
    {
        $options = get_option($this->instance_name);
        wp_send_json_success(json_decode($options));
    }

    // Phương thức để thêm page
    public function addPage(Page $page)
    {
        $this->pages[$page->title] = $page; // Sử dụng title làm key
    }
}