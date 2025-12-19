<?php

namespace Jankx\Dashboard;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

use Jankx\Dashboard\Elements\Page;

class OptionFramework
{
    private $instance_name;
    private $page_title = 'Tùy Chọn Theme Jankx';
    private $menu_text = 'Tùy Chọn';
    private $config;
    public $pages = [];
    private static $built_in_options = [];
    private $menu_slug = null;
    private $auto_register_menu = true; // Flag để bật/tắt việc tự động đăng ký menu

    public function __construct($instance_name)
    {
        $this->instance_name = $instance_name;

        // Nếu có built-in options cho instance này thì merge vào pages
        if (isset(self::$built_in_options[$instance_name])) {
            $this->pages = array_merge($this->pages, self::$built_in_options[$instance_name]);
        }

        if ($this->auto_register_menu) {
            add_action('admin_menu', [$this, 'addOptionsPage']);
        }
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
            'capability' => 'manage_options',
            'menu_type' => 'add_theme_menu',
            'menu_slug' => null, // Nếu set, sẽ sử dụng slug này thay vì {$instance_name}-options
            'auto_register_menu' => true // Bật/tắt việc tự động đăng ký menu
        ]);

        // Lưu menu_slug nếu được set trong config
        if (isset($config['menu_slug']) && !empty($config['menu_slug'])) {
            $this->menu_slug = $config['menu_slug'];
        }

        // Tắt auto register menu nếu được chỉ định trong config
        if (isset($config['auto_register_menu']) && $config['auto_register_menu'] === false) {
            $this->auto_register_menu = false;
            // Remove hook nếu đã được thêm
            remove_action('admin_menu', [$this, 'addOptionsPage']);
        }

        return $this;
    }

    /**
     * Set custom menu slug
     *
     * @param string $menu_slug
     * @return $this
     */
    public function setMenuSlug($menu_slug)
    {
        $this->menu_slug = $menu_slug;
        return $this;
    }

    /**
     * Get menu slug
     *
     * @return string
     */
    public function getMenuSlug()
    {
        return $this->menu_slug ?: "{$this->instance_name}-options";
    }

    /**
     * Tắt/bật việc tự động đăng ký menu
     *
     * @param bool $auto_register
     * @return $this
     */
    public function setAutoRegisterMenu($auto_register)
    {
        $this->auto_register_menu = $auto_register;
        return $this;
    }

    // Các phương thức getter cho config
    public function getLogo()
    {
        return $this->config['logo'] ?? '';
    }

    public function getVersion()
    {
        return $this->config['version'] ?? '1.0.0';
    }

    public function getDescription()
    {
        return $this->config['description'] ?? '';
    }

    public function getSocialLinks()
    {
        return $this->config['social_links'] ?? [];
    }

    public function getSupportUrl()
    {
        return $this->config['support_url'] ?? '';
    }

    public function getDocumentationUrl()
    {
        return $this->config['documentation_url'] ?? '';
    }

    public function addOptionsPage()
    {
        $menu_slug = $this->getMenuSlug();
        add_menu_page(
            $this->page_title,
            $this->menu_text,
            $this->config['capability'],
            $menu_slug,
            [$this, 'renderOptionsPage'],
            $this->config['menu_icon'],
            $this->config['menu_position']
        );
    }

    // Hàm merge sâu built-in options và user options, user luôn ưu tiên
    private function mergeOptions($built_in, $user) {
        foreach ($built_in as $page_id => $page) {
            if (!isset($user[$page_id])) {
                $user[$page_id] = $page;
            } else {
                // Merge sections
                foreach ($page['sections'] as $section_id => $section) {
                    if (!isset($user[$page_id]['sections'][$section_id])) {
                        $user[$page_id]['sections'][$section_id] = $section;
                    } else {
                        // Merge fields
                        $user_fields = $user[$page_id]['sections'][$section_id]['fields'] ?? [];
                        $built_fields = $section['fields'] ?? [];
                        $fields_by_id = [];
                        foreach ($built_fields as $f) {
                            $fields_by_id[$f['id']] = $f;
                        }
                        foreach ($user_fields as $f) {
                            $fields_by_id[$f['id']] = $f; // user field ưu tiên
                        }
                        $user[$page_id]['sections'][$section_id]['fields'] = array_values($fields_by_id);
                    }
                }
            }
        }
        return $user;
    }

    // Transform Page objects to array format
    private function transformPagesToArray($pages) {
        $result = [];
        foreach ($pages as $key => $page) {
            if ($page instanceof Page) {
                $pageId = $page->getId() ?: $key;
                $sections = [];
                foreach ($page->getSections() as $section) {
                    $sectionId = $section->getId() ?: sanitize_title($section->getTitle());
                    $fields = [];
                    foreach ($section->getFields() as $field) {
                        $fieldId = $field->getId() ?: '';
                        $fieldType = $field->getType() ?: 'text';
                        $fieldTitle = $field->getTitle() ?: '';
                        $fieldArgs = $field->getArgs() ?: [];
                        
                        $fieldData = [
                            'id' => $fieldId,
                            'type' => $fieldType,
                            'title' => $fieldTitle,
                        ];
                        
                        // Add args properties
                        if (isset($fieldArgs['subtitle'])) {
                            $fieldData['subtitle'] = $fieldArgs['subtitle'];
                        }
                        if (isset($fieldArgs['default']) || isset($fieldArgs['default_value'])) {
                            $fieldData['default'] = $fieldArgs['default'] ?? $fieldArgs['default_value'] ?? null;
                        }
                        if (isset($fieldArgs['options'])) {
                            $fieldData['options'] = $fieldArgs['options'];
                        }
                        if (isset($fieldArgs['placeholder'])) {
                            $fieldData['placeholder'] = $fieldArgs['placeholder'];
                        }
                        if (isset($fieldArgs['min'])) {
                            $fieldData['min'] = $fieldArgs['min'];
                        }
                        if (isset($fieldArgs['max'])) {
                            $fieldData['max'] = $fieldArgs['max'];
                        }
                        if (isset($fieldArgs['step'])) {
                            $fieldData['step'] = $fieldArgs['step'];
                        }
                        if (isset($fieldArgs['unit'])) {
                            $fieldData['unit'] = $fieldArgs['unit'];
                        }
                        
                        $fields[] = $fieldData;
                    }
                    $sections[$sectionId] = [
                        'id' => $sectionId,
                        'title' => $section->getTitle(),
                        'fields' => $fields,
                    ];
                }
                $result[$pageId] = [
                    'id' => $pageId,
                    'title' => $page->getTitle(),
                    'icon' => $page->getIcon(),
                    'sections' => $sections,
                ];
            } else {
                // Already array format
                $result[$key] = $page;
            }
        }
        return $result;
    }

    // Lấy options đã merge để truyền sang JS
    public function getMergedPages() {
        $built_in = self::$built_in_options[$this->instance_name] ?? [];
        $transformed_pages = $this->transformPagesToArray($this->pages);
        return $this->mergeOptions($built_in, $transformed_pages);
    }

    public function renderOptionsPage()
    {
        $nonce = wp_create_nonce('save_options_nonce');

        // Truyền dữ liệu sang JavaScript
        wp_localize_script('react-app', 'optionsData', $this->getMergedPages());
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
        $menu_slug = $this->getMenuSlug();
        $check_slug = $this->menu_slug ? $menu_slug : "{$this->instance_name}-options";
        if (str_contains($screen->id, $check_slug)) {
            // Enqueue Google Fonts (optional, can be bundled too if needed)
            wp_enqueue_style('jankx-options-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', [], null);
            
            // Coloris and Air Datepicker CSS are now bundled in styles.css (no CDN needed)
            // Tải script và CSS chỉ khi ở trên trang tùy chọn
            // All dependencies (coloris, air-datepicker) are bundled in bundle.js and styles.css
            wp_enqueue_script('react-app', get_template_directory_uri() . '/vendor/jankx/dashboard-framework/dist/bundle.js?v=1.0.1.40', ['wp-element'], null, true);
            wp_enqueue_style('option-framework-style', get_template_directory_uri() . '/vendor/jankx/dashboard-framework/dist/styles.css?v=1.0.0.26');

            // Add WordPress Media Uploader
            wp_enqueue_media();

            // Icon Picker - TODO: Implement React-based icon picker component
            // wp_enqueue_style('dashicons');
        }
    }

    public function saveOptions()
    {
        if (!Jankx_Security_Helper::verify_nonce('nonce', 'save_options_nonce')) {
            wp_send_json_error('Nonce không hợp lệ');
            return;
        }

        // Safely get input data
        $input_data = file_get_contents('php://input');
        if (empty($input_data)) {
            wp_send_json_error('Không có dữ liệu được gửi');
            return;
        }

        $data = json_decode($input_data, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            wp_send_json_error('Dữ liệu JSON không hợp lệ');
            return;
        }

        if (!isset($data['data'])) {
            wp_send_json_error('Thiếu dữ liệu cần thiết');
            return;
        }

        $options_data = json_decode($data['data'], true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            wp_send_json_error('Dữ liệu options không hợp lệ');
            return;
        }

        if (is_array($options_data)) {
            $result = update_option($this->instance_name, json_encode($options_data));
            if ($result) {
                wp_send_json_success('Lưu options thành công');
            } else {
                wp_send_json_error('Không thể lưu options');
            }
        } else {
            wp_send_json_error('Dữ liệu không hợp lệ');
        }
    }

    public function fetchOptions()
    {
        $options = get_option($this->instance_name);
        if (is_array($options)) {
            wp_send_json_success($options);
            return;
        }
        if (is_string($options) && $options !== '') {
            $decoded = json_decode($options, true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                wp_send_json_success($decoded);
                return;
            }
        }
        wp_send_json_success([]);
    }

    // Phương thức để thêm page
    public function addPage(Page $page)
    {
        $this->pages[$page->getTitle()] = $page; // Sử dụng title làm key
    }

    public function getInstanceName()
    {
        return $this->instance_name;
    }

    public function getPageTitle()
    {
        return $this->page_title;
    }

    public function registerMenu()
    {
        if ($this->config['menu_type'] === 'add_menu_page') {
            add_menu_page(
                __('Theme Options', 'jankx'),
                __('Theme Options', 'jankx'),
                $this->config['capability'],
                'jankx-theme-options',
                [$this, 'renderPage'],
                $this->config['menu_icon'],
                $this->config['menu_position']
            );
        } else {
            add_theme_page(
                __('Theme Options', 'jankx'),
                __('Theme Options', 'jankx'),
                $this->config['capability'],
                'jankx-theme-options',
                [$this, 'renderPage']
            );
        }
    }

    public static function registerBuiltInOptions($instance_id, $options)
    {
        self::$built_in_options[$instance_id] = $options;
    }
}
