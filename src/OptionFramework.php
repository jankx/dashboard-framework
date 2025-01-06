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


        // Hook cho hành động AJAX
        add_action('wp_ajax_save_options', [$this, 'saveOptions']);
        add_action('wp_ajax_fetch_options', [$this, 'fetchOptions']);
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
        wp_enqueue_script('react-app', get_template_directory_uri() . '/vendor/jankx/dashboard-framework/dist/bundle.js?v=1.0.0.13', ['wp-element'], null, true);
    }

    public function saveOptions()
    {
        // Kiểm tra nonce và quyền truy cập nếu cần
        // $this->checkNonce(); // Nếu bạn có kiểm tra nonce, hãy gọi hàm này

        // Lấy dữ liệu từ yêu cầu
        $data = json_decode(file_get_contents('php://input'), true);
        $data = json_decode($data['data'], true);

        // Kiểm tra xem dữ liệu có hợp lệ không
        if (is_array($data)) {
            // Lưu dữ liệu vào wp_options
            update_option($this->instance_name, json_encode($data));
            wp_send_json_success(); // Gửi phản hồi thành công
        } else {
            wp_send_json_error('Dữ liệu không hợp lệ'); // Gửi phản hồi lỗi
        }
    }

    public function fetchOptions()
    {
        // Lấy dữ liệu từ wp_options
        $options = get_option($this->instance_name);
        // Trả về dữ liệu dưới dạng JSON
        wp_send_json_success(json_decode($options));
    }
}