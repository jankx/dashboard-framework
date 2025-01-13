<?php

namespace Jankx\Dashboard;

use Jankx\Dashboard\Elements\Page;

class OptionFramework
{
    private $instance_name;
    private $page_title = 'Tùy Chọn Theme Jankx';
    private $menu_text = 'Tùy Chọn';
    private $config;
    public $pages = [];

    public function __construct($instance_name)
    {
        $this->instance_name = $instance_name;

        add_action('admin_menu', [$this, 'addOptionsPage']);
        add_action('admin_enqueue_scripts', [$this, 'enqueueScripts']);
        add_action('wp_ajax_save_options', [$this, 'saveOptions']);
        add_action('wp_ajax_fetch_options', [$this, 'fetchOptions']);
    }

    public function setPageTitle($page_title)
    {
        $this->page_title = $page_title;
        return $this;
    }

    public function setMenuText($menu_text)
    {
        $this->menu_text = $menu_text;
        return $this;
    }

    public function setConfig($config = [])
    {
        $this->config = wp_parse_args($config, [
            'logo' => '',
            'version' => '1.0.0',
            'description' => '',
            'social_links' => [
                'facebook' => '',
                'twitter' => '',
                'github' => '',
                'linkedin' => ''
            ],
            'support_url' => '',
            'documentation_url' => '',
            'menu_position' => null,
            'menu_icon' => '',
            'capability' => 'manage_options'
        ]);

        return $this;
    }

    // Các phương thức getter cho config
    public function getLogo() {
        return $this->config['logo'] ?? '';
    }

    public function getVersion() {
        return $this->config['version'] ?? '1.0.0';
    }

    public function getDescription() {
        return $this->config['description'] ?? '';
    }

    public function getSocialLinks() {
        return $this->config['social_links'] ?? [];
    }

    public function getSupportUrl() {
        return $this->config['support_url'] ?? '';
    }

    public function getDocumentationUrl() {
        return $this->config['documentation_url'] ?? '';
    }

    public function addOptionsPage()
    {
        add_menu_page(
            $this->page_title,
            $this->menu_text,
            $this->config['capability'],
            "{$this->instance_name}-options",
            [$this, 'renderOptionsPage'],
            $this->config['menu_icon'],
            $this->config['menu_position']
        );
    }

    public function renderOptionsPage()
    {
        $nonce = wp_create_nonce('save_options_nonce');

        // Truyền dữ liệu sang JavaScript
        wp_localize_script('react-app', 'optionsData', $this->pages);
        wp_localize_script('react-app', 'frameworkConfig', $this->config);
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
        // Lấy thông tin màn hình hiện tại
        $screen = get_current_screen();

        // Kiểm tra xem người dùng có đang ở trên trang tùy chọn của instance không
        if (str_contains($screen->id, "{$this->instance_name}-options")) {
            // Tải script và CSS chỉ khi ở trên trang tùy chọn
            wp_enqueue_script('react-app', get_template_directory_uri() . '/vendor/jankx/dashboard-framework/dist/bundle.js?v=1.0.1.22', ['wp-element'], null, true);
            wp_enqueue_style('option-framework-style', get_template_directory_uri() . '/vendor/jankx/dashboard-framework/dist/style.css?v=1.0.0.9'); // Thêm CSS nếu cần
        }
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

    public function getInstanceName()
    {
        return $this->instance_name;
    }

    public function getPageTitle()
    {
        return $this->page_title;
    }
}