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
    private $auto_register_menu = true; // Flag để bật/tắt việc tự động đăng ký menu
    protected $app;

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
        add_action('wp_ajax_fetch_icons', [$this, 'fetchIcons']);
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
            'auto_register_menu' => true, // Bật/tắt việc tự động đăng ký menu
            'sync_with_customizer' => false, // Bật/tắt việc đồng bộ với WordPress Customizer
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

        // Đăng ký Customizer nếu được bật
        if (!empty($this->config['sync_with_customizer'])) {
            add_action('customize_register', [$this, 'registerCustomizer']);
            add_action('customize_controls_enqueue_scripts', [$this, 'enqueueCustomizerScripts']);
        }

        return $this;
    }

    public function setApp($app)
    {
        $this->app = $app;
        return $this;
    }

    /**
     * Enqueue Customizer scripts and styles
     */
    public function enqueueCustomizerScripts()
    {
        $base_url = get_stylesheet_directory_uri() . '/vendor/jankx/dashboard-framework/gui/assets';
        $version = '1.1.0'; // Stable Release
        
        wp_enqueue_script(
            'jankx-customizer-controls',
            $base_url . '/customizer.js',
            ['jquery', 'customize-controls', 'wp-element', 'react'],
            $version,
            true
        );

        wp_enqueue_style(
            'jankx-customizer-controls',
            $base_url . '/customizer.css',
            [],
            $version
        );
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
                        $fields[] = $this->transformFieldToArray($field, $for_js);
                    }
                    $sections[$sectionId] = [
                        'id' => $sectionId,
                        'title' => $section->getTitle(),
                        'description' => $section->getDescription(),
                        'fields' => $fields,
                    ];
                }
                $result[$pageId] = [
                    'id' => $pageId,
                    'title' => $page->getTitle(),
                    'icon' => $page->getIcon(),
                    'description' => $page->getDescription(),
                    'sections' => $sections,
                ];
            } else {
                $result[$key] = $page;
            }
        }
        return $result;
    }

    /**
     * Transform a single field object to array format
     *
     * @param mixed $field
     * @param bool $for_js
     * @return array
     */
    private function transformFieldToArray($field, $for_js = false) {
        if (!($field instanceof \Jankx\Dashboard\Elements\Field)) {
            $arrayField = (array) $field;
            if (!isset($arrayField['title']) && isset($arrayField['name'])) {
                $arrayField['title'] = $arrayField['name'];
            }
            if ($for_js && isset($arrayField['type']) && $arrayField['type'] === 'image') {
                $arrayField['type'] = 'media';
            }
            return $arrayField;
        }

        $type = $field->getType();
        if ($for_js) {
            if ($type === 'image') {
                $type = 'media';
            }
            // Map checkbox without options to switch for UI compatibility
            if ($type === 'checkbox' && !isset($field->getArgs()['options'])) {
                $type = 'switch';
            }
        }

        $fieldData = [
            'id' => $field->getId(),
            'type' => $type,
            'title' => $field->getTitle(),
            'subtitle' => $field->getSubtitle(),
            'description' => $field->getDescription(),
        ];

        $fieldArgs = $field->getArgs();
        if (!empty($fieldArgs)) {
            // Filter some args if for JS
            if ($for_js) {
                // If writer/getter are closures, they can't be serialized to JS
                if (isset($fieldArgs['writer']) && !is_string($fieldArgs['writer'])) {
                    unset($fieldArgs['writer']);
                }
                if (isset($fieldArgs['getter']) && !is_string($fieldArgs['getter'])) {
                    unset($fieldArgs['getter']);
                }
            }
            $fieldData = array_merge($fieldData, (array) $fieldArgs);
        }

        // Recursively transform sub-fields (useful for Repeater/Group)
        if (isset($fieldData['fields']) && is_array($fieldData['fields'])) {
            foreach ($fieldData['fields'] as $key => $subField) {
                $fieldData['fields'][$key] = $this->transformFieldToArray($subField, $for_js);
            }
        }

        return $fieldData;
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

        $framework_version = '1.0.0'; // Default fallback
        $icon = $this->config['menu_icon'] ?? 'dashicons-admin-generic';
        $title = $this->page_title;
        $subtitle = __('Cấu hình các tùy chọn cho giao diện website của bạn.', 'jankx');

        ?>
        <div class="jankx-admin-page-container jankx-theme-options-page">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

                .jankx-admin-page-container {
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    margin: 20px 20px 20px 0;
                    color: #1e293b;
                }

                .jankx-universal-header {
                    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
                    padding: 40px;
                    border-radius: 24px;
                    color: #f8fafc;
                    margin-bottom: 30px;
                    box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.1);
                }

                .jankx-universal-header .header-content { display: flex; align-items: center; gap: 24px; }
                .jankx-universal-header .header-icon {
                    width: 64px; height: 64px;
                    background: rgba(59, 130, 246, 0.2);
                    border-radius: 18px;
                    display: flex; align-items: center; justify-content: center;
                    border: 1px solid rgba(59, 130, 246, 0.3);
                }
                .jankx-universal-header .header-icon .dashicons { font-size: 32px; width: 32px; height: 32px; color: #60a5fa; }
                .jankx-universal-header .header-text h1 { margin: 0; font-size: 28px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 12px; }
                .jankx-universal-header .version-badge { font-size: 12px; background: rgba(59, 130, 246, 0.5); padding: 4px 10px; border-radius: 20px; font-weight: 600; }
                .jankx-universal-header .header-text .subtitle { margin: 8px 0 0 0; font-size: 16px; color: #94a3b8; }
                .jankx-admin-footer {
                    margin-top: 50px;
                    padding-top: 20px;
                    border-top: 1px solid #e2e8f0;
                    color: #64748b;
                    font-size: 13px;
                    text-align: center;
                }
                #option-framework-app { min-height: 500px; }
            </style>

            <header class="jankx-universal-header">
                <div class="header-content">
                    <div class="header-icon">
                        <span class="dashicons <?php echo esc_attr($icon); ?>"></span>
                    </div>
                    <div class="header-text">
                        <h1><?php echo esc_html($title); ?> <span class="version-badge">v<?php echo $framework_version; ?></span></h1>
                        <p class="subtitle"><?php echo esc_html($subtitle); ?></p>
                    </div>
                </div>
            </header>

            <div class="jankx-universal-content">
                <div id="option-framework-app"></div>
            </div>

            <footer class="jankx-admin-footer">
                <p>&copy; <?php echo date('Y'); ?> Jankx Framework. Made with <span class="dashicons dashicons-heart" style="color: #ef4444; font-size: 14px; width: 14px; height: 14px;"></span> by Puleeno.</p>
            </footer>
        </div>

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
            wp_enqueue_script('react-app', get_template_directory_uri() . '/vendor/jankx/dashboard-framework/dist/bundle.js?v=1.0.1.41', ['wp-element'], null, true);
            wp_enqueue_style('option-framework-style', get_template_directory_uri() . '/vendor/jankx/dashboard-framework/dist/styles.css?v=1.0.0.27');

            // Add WordPress Media Uploader
            wp_enqueue_media();

            // Enqueue active icon fonts from the repository
            try {
                if ($this->app && $this->app->bound(\Jankx\Services\FontIcons\IconRepository::class)) {
                    $repo = $this->app->make(\Jankx\Services\FontIcons\IconRepository::class);
                    if ($repo) {
                       $styles = $repo->getAllActiveStyles();
                       foreach ($styles as $handle => $url) {
                           wp_enqueue_style('jankx-icon-' . $handle, $url, [], null);
                       }
                    }
                }
            } catch (\Exception $e) {
                // Ignore if icon repository not found or failed
            }

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
            do_action('jankx_dashboard_before_save_options', $options_data, $this->instance_name);

            // Get all registered fields to check for custom writers/option names
            $mapped_pages = $this->getMergedPages();
            
            // Handle independent field saving
            $sync_with_customizer = $this->config['sync_with_customizer'] ?? false;
            foreach ($mapped_pages as $page) {
                foreach ($page['sections'] as $section) {
                    foreach ($section['fields'] as $field) {
                        $field_id = $field['id'];
                        if (isset($options_data[$field_id])) {
                            $value = $options_data[$field_id];
                            
                            // Synchronize with WordPress Customizer
                            if ($sync_with_customizer) {
                                set_theme_mod($field_id, $value);
                            }

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

            // Get existing options to compare for the main group. Parse JSON if it's an old string format.
            $existing_options = get_option($this->instance_name);
            if (is_string($existing_options) && !empty($existing_options)) {
                $existing_options = json_decode($existing_options, true) ?: [];
            } else if (!is_array($existing_options)) {
                $existing_options = [];
            }

            if ($existing_options === $options_data) {
                wp_send_json_success('Lưu options thành công'); // Send success if no changes to main blob but might have saved others
                return;
            }

            $result = update_option($this->instance_name, $options_data);
            if ($result) {
                do_action('jankx_dashboard_after_save_options', $options_data, $this->instance_name);
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
        $sync_with_customizer = $this->config['sync_with_customizer'] ?? false;
        $mapped_pages = $this->getMergedPages();
        foreach ($mapped_pages as $page) {
            foreach ($page['sections'] as $section) {
                foreach ($section['fields'] as $field) {
                    $field_id = $field['id'];
                    $custom_value = null;
                    $has_custom = false;

                    // Fetch from Customizer (theme_mod) if sync is enabled
                    if ($sync_with_customizer) {
                        $custom_value = get_theme_mod($field_id, $field['default'] ?? null);
                        $has_custom = true;
                    }

                    // Custom getter?
                    if (!$has_custom && isset($field['getter']) && is_callable($field['getter'])) {
                        $custom_value = call_user_func($field['getter'], $field_id);
                        $has_custom = true;
                    }
                    // Individual option name?
                    elseif (!$has_custom && isset($field['option_name']) && !empty($field['option_name'])) {
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
    
    public function fetchIcons()
    {
        $type = $_GET['type'] ?? null;
        $search = $_GET['search'] ?? '';
        $category = $_GET['category'] ?? null;

        try {
            $repo = $this->app->make(\Jankx\Services\FontIcons\IconRepository::class);
            if (!$repo) {
                wp_send_json_error('Icon Repository not found');
            }

            $results = [];
            if ($search) {
                $results = $repo->searchIcons($search, $type);
            } elseif ($type) {
                $results = $repo->getIconsByType($type, ['category' => $category]);
            } else {
                // Return types and categories first if no type selected
                wp_send_json_success([
                    'types' => $repo->getIconTypes(),
                    'active_types' => $repo->getActiveTypes()
                ]);
            }

            wp_send_json_success($results);
        } catch (\Exception $e) {
            wp_send_json_error($e->getMessage());
        }
    }

    // Phương thức để thêm page
    public function addPage(Page $page)
    {
        $this->pages[$page->getTitle()] = $page; // Sử dụng title làm key
    }

    /**
     * Set all options via a single array (WP-friendly way)
     *
     * @param array $options_array
     * @return $this
     */
    public function setOptions(array $options_array)
    {
        foreach ($options_array as $page_data) {
            $id = $page_data['id'] ?? '';
            $title = $page_data['name'] ?? $page_data['title'] ?? $id;
            
            $page = new Page($title);
            if (!empty($id)) {
                $page->setId($id);
            }
            if (isset($page_data['icon'])) {
                $page->setIcon($page_data['icon']);
            }
            if (isset($page_data['description'])) {
                $page->setDescription($page_data['description']);
            }
            if (isset($page_data['args'])) {
                foreach ($page_data['args'] as $key => $val) {
                    if (method_exists($page, 'set' . ucfirst($key))) {
                        call_user_func([$page, 'set' . ucfirst($key)], $val);
                    }
                }
            }

            if (isset($page_data['sections'])) {
                foreach ($page_data['sections'] as $section_data) {
                    $sid = $section_data['id'] ?? '';
                    $stitle = $section_data['name'] ?? $section_data['title'] ?? $sid;
                    
                    $section = new \Jankx\Dashboard\Elements\Section($stitle);
                    if (!empty($sid)) {
                        $section->setId($sid);
                    }
                    if (isset($section_data['description'])) {
                        $section->setDescription($section_data['description']);
                    }
                    if (isset($section_data['fields'])) {
                        foreach ($section_data['fields'] as $field_data) {
                            $field = \Jankx\Dashboard\Factories\FieldFactory::create(
                                $field_data['id'] ?? '',
                                $field_data['name'] ?? $field_data['title'] ?? '',
                                $field_data['type'] ?? 'text',
                                $field_data
                            );
                            if ($field) {
                                $section->addField($field);
                            }
                        }
                    }
                    $page->addSection($section);
                }
            }
            $this->addPage($page);
        }
        return $this;
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

    /**
     * Map framework field types to WordPress Customizer control types
     *
     * @param string $type
     * @return string|null
     */
    protected function mapCustomizerControl($type)
    {
        $map = [
            'text'        => 'text',
            'textarea'    => 'textarea',
            'checkbox'    => 'checkbox',
            'switch'      => 'checkbox',
            'radio'       => 'radio',
            'select'      => 'select',
            'number'      => 'number',
            'slider'      => 'number',
            'color'       => 'WP_Customize_Color_Control',
            'image'       => 'WP_Customize_Image_Control',
            'media'       => 'WP_Customize_Media_Control',
            'upload'      => 'WP_Customize_Image_Control',
            'typography'  => \Jankx\Dashboard\Customizer\Controls\TypographyControl::class,
            'repeater'    => 'textarea', // Fallback for now
            'divide'      => null, // Dividers usually don't have a customizer control
        ];

        return $map[$type] ?? null;
    }

    /**
     * Register panels, sections, and controls into WordPress Customizer
     *
     * @param \WP_Customize_Manager $wp_customize
     */
    public function registerCustomizer($wp_customize)
    {
        if (file_exists(__DIR__ . '/Customizer/Controls/TypographyControl.php')) {
            require_once __DIR__ . '/Customizer/Controls/TypographyControl.php';
        }

        $mapped_pages = $this->getMergedPages();
        
        foreach ($mapped_pages as $page) {
            $page_title = $page['name'] ?? $page['title'] ?? null;
            $page_id = $page['id'] ?? null;
            $sections = $page['sections'] ?? [];

            if (empty($page_title) || empty($page_id) || empty($sections)) {
                continue;
            }

            // Group sections into panels if more than one
            $is_panel = count($sections) > 1;
            $panel_id = null;

            if ($is_panel) {
                $panel_id = "jankx_panel_{$page_id}";
                $wp_customize->add_panel($panel_id, [
                    'title' => $page_title,
                    'description' => $page['args']['description'] ?? $page['description'] ?? '',
                    'priority' => ($page['args']['priority'] ?? 30) + 160,
                ]);
            }

            foreach ($sections as $section) {
                $section_title = $section['name'] ?? $section['title'] ?? null;
                $sid = $section['id'] ?? null;
                $fields = $section['fields'] ?? [];

                if (empty($section_title) || empty($sid)) {
                    continue;
                }

                $section_id = "jankx_section_{$sid}";
                
                $wp_customize->add_section($section_id, [
                    'title' => $is_panel ? $section_title : $page_title,
                    'description' => $section['description'] ?? '',
                    'panel' => $panel_id,
                    'priority' => $is_panel ? ($section['priority'] ?? 30) : (($page['args']['priority'] ?? 10) + 160),
                ]);

                foreach ($fields as $field) {
                    $setting_id = $field['id'];
                    if (empty($setting_id)) {
                        continue;
                    }

                    $type = $field['type'] ?? 'text';
                    $control_class = $this->mapCustomizerControl($type);

                    if (empty($control_class)) {
                        continue;
                    }

                    $default = $field['default'] ?? null;
                    
                    // Register setting
                    $wp_customize->add_setting($setting_id, [
                        'default' => $default,
                        'type' => 'theme_mod',
                        'capability' => $this->config['capability'] ?? 'edit_theme_options',
                        'transport' => $field['transport'] ?? 'refresh',
                        'sanitize_callback' => $field['sanitize_callback'] ?? 'sanitize_text_field',
                    ]);

                    $control_args = [
                        'label' => $field['title'] ?? $field['name'] ?? $setting_id,
                        'description' => $field['subtitle'] ?? $field['desc'] ?? '',
                        'section' => $section_id,
                        'choices' => $field['options'] ?? [],
                    ];

                    // Add control (standard or specialized)
                    if (!class_exists($control_class)) {
                        $control_args['type'] = $control_class;
                        $wp_customize->add_control($setting_id, $control_args);
                    } else {
                        // specialized class-based controls
                        $wp_customize->add_control(new $control_class($wp_customize, $setting_id, $control_args));
                    }
                }
            }
        }
    }

    public static function registerBuiltInOptions($instance_id, $options)
    {
        self::$built_in_options[$instance_id] = $options;
    }
}
