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
    private function transformPagesToArray($pages, $for_js = false) {
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
                        if (isset($fieldArgs['subtitle']) || isset($fieldArgs['sub_title'])) {
                            $fieldData['subtitle'] = $fieldArgs['subtitle'] ?? $fieldArgs['sub_title'];
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
                        if (isset($fieldArgs['width'])) {
                            $fieldData['width'] = $fieldArgs['width'];
                        }
                        if (isset($fieldArgs['height'])) {
                            $fieldData['height'] = $fieldArgs['height'];
                        }
                        if (isset($fieldArgs['option_name'])) {
                            $fieldData['option_name'] = $fieldArgs['option_name'];
                        }
                        if (isset($fieldArgs['writer'])) {
                           if ($for_js) {
                               if (is_string($fieldArgs['writer'])) {
                                   $fieldData['writer'] = $fieldArgs['writer'];
                               }
                           } else {
                               $fieldData['writer'] = $fieldArgs['writer'];
                           }
                        }
                        if (isset($fieldArgs['getter'])) {
                           if ($for_js) {
                               if (is_string($fieldArgs['getter'])) {
                                   $fieldData['getter'] = $fieldArgs['getter'];
                               }
                           } else {
                               $fieldData['getter'] = $fieldArgs['getter'];
                           }
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
    public function getMergedPages($for_js = false) {
        $built_in = self::$built_in_options[$this->instance_name] ?? [];
        $transformed_pages = $this->transformPagesToArray($this->pages, $for_js);
        return $this->mergeOptions($built_in, $transformed_pages);
    }

    public function renderOptionsPage()
    {
        $nonce = wp_create_nonce('save_options_nonce');

        // Truyền dữ liệu sang JavaScript
        wp_localize_script('react-app', 'optionsData', $this->getMergedPages(true));
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

        // Try to get data from $_POST first (standard WordPress AJAX)
        $options_json = isset($_POST['data']) ? wp_unslash($_POST['data']) : null;

        // If not in $_POST, try to read from php://input (for application/json)
        if (empty($options_json)) {
            $input_data = file_get_contents('php://input');
            if (!empty($input_data)) {
                $data = json_decode($input_data, true);
                if (json_last_error() === JSON_ERROR_NONE && isset($data['data'])) {
                    $options_json = $data['data'];
                }
            }
        }

        if (empty($options_json)) {
            wp_send_json_error('Không có dữ liệu được gửi');
            return;
        }

        $options_data = is_array($options_json) ? $options_json : json_decode($options_json, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            wp_send_json_error('Dữ liệu options không hợp lệ');
            return;
        }

        if (is_array($options_data)) {
            // Get all registered fields to check for custom writers/option names
            $mapped_pages = $this->getMergedPages();
            
            // Handle independent field saving
            foreach ($mapped_pages as $page) {
                foreach ($page['sections'] as $section) {
                    foreach ($section['fields'] as $field) {
                        $field_id = $field['id'];
                        if (isset($options_data[$field_id])) {
                            $value = $options_data[$field_id];
                            
                            // Custom writer? (function name in config)
                            if (isset($field['writer']) && is_callable($field['writer'])) {
                                call_user_func($field['writer'], $value, $field_id);
                            }
                            // Individual option name?
                            elseif (isset($field['option_name']) && !empty($field['option_name'])) {
                                update_option($field['option_name'], $value);
                            }
                        }
                    }
                }
            }

            // Get existing options to compare for the main group
            $existing_options = get_option($this->instance_name);
            $new_options_json = json_encode($options_data);

            if ($existing_options === $new_options_json) {
                wp_send_json_success('Lưu options thành công'); // Send success if no changes to main blob but might have saved others
                return;
            }

            $result = update_option($this->instance_name, $new_options_json);
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
        $options_json = get_option($this->instance_name);
        $options_data = [];

        if (is_string($options_json) && $options_json !== '') {
            $options_data = json_decode($options_json, true) ?: [];
        } elseif (is_array($options_json)) {
            $options_data = $options_json;
        }

        // Aggregate with custom getters and individual option names
        $mapped_pages = $this->getMergedPages();
        foreach ($mapped_pages as $page) {
            foreach ($page['sections'] as $section) {
                foreach ($section['fields'] as $field) {
                    $field_id = $field['id'];
                    $custom_value = null;
                    $has_custom = false;

                    // Custom getter?
                    if (isset($field['getter']) && is_callable($field['getter'])) {
                        $custom_value = call_user_func($field['getter'], $field_id);
                        $has_custom = true;
                    }
                    // Individual option name?
                    elseif (isset($field['option_name']) && !empty($field['option_name'])) {
                        $custom_value = get_option($field['option_name'], $field['default'] ?? null);
                        $has_custom = true;
                    }

                    if ($has_custom) {
                        $options_data[$field_id] = $custom_value;
                    }
                }
            }
        }

        wp_send_json_success($options_data);
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
