# Jankx Dashboard Framework

Jankx Dashboard Framework là một hệ thống UI hiện đại được xây dựng bằng React để tạo theme options trong WordPress admin. Framework này cung cấp giao diện đẹp, responsive và dễ sử dụng cho việc quản lý theme options.

## 🏗️ Architecture Overview

### **1. Core Architecture Flow**

```mermaid
graph TD
    A[Configuration Files] --> B[OptionFramework.php]
    B --> C[Elements Layer]
    C --> D[React UI Layer]
    D --> E[WordPress Admin]

    subgraph "Configuration Layer"
        A1[PHP Arrays] --> A2[OptionsReader]
        A2 --> A3[ConfigRepository]
    end

    subgraph "Framework Layer"
        B1[OptionFramework] --> B2[Page Elements]
        B2 --> B3[Section Elements]
        B3 --> B4[Field Elements]
    end

    subgraph "UI Layer"
        C1[React Components] --> C2[Form Controls]
        C2 --> C3[Real-time Preview]
        C3 --> C4[AJAX Save/Load]
    end

    A3 --> B1
    B4 --> C1
    C4 --> E
```

### **2. Element Hierarchy**

```mermaid
graph TD
    A[OptionFramework] --> B[Page]
    B --> C[Section]
    C --> D[Field]

    subgraph "Field Types"
        D --> E[TextField]
        D --> F[TextareaField]
        D --> G[SelectField]
        D --> H[ImageField]
        D --> I[IconField]
    end

    subgraph "Factory Pattern"
        J[FieldFactory] --> E
        J --> F
        J --> G
        J --> H
        J --> I
    end

    subgraph "Interfaces"
        K[FieldInterface]
        L[PageInterface]
        M[SectionInterface]
    end

    D -.-> K
    B -.-> L
    C -.-> M
```

### **3. Data Flow Architecture**

```mermaid
sequenceDiagram
    participant CF as Config Files
    participant OF as OptionFramework
    participant FF as FieldFactory
    participant RE as React Elements
    participant WP as WordPress DB

    CF->>OF: Load configuration
    OF->>FF: Create field instances
    FF->>RE: Render React components
    RE->>WP: Save via AJAX
    WP->>RE: Load saved data
    RE->>OF: Update UI state
```

## 🎯 Core Concepts

### **1. Element-Based Architecture**

Framework sử dụng kiến trúc dựa trên elements với hierarchy rõ ràng:

```
OptionFramework (Container)
├── Page (Container)
│   └── Section (Container)
│       └── Field (Input Element)
```

### **2. Factory Pattern**

FieldFactory được sử dụng để tạo field instances dựa trên type:

```php
// FieldFactory.php
class FieldFactory
{
    public static function create($id, $title, $type, $args)
    {
        switch ($type) {
            case 'text':
                return new TextField($id, $title, $args);
            case 'textarea':
                return new TextareaField($id, $title, $args);
            case 'select':
                return new SelectField($id, $title, $args);
            case 'image':
                return new ImageField($id, $title, $args);
            case 'icon':
                return new IconField($id, $title, $args);
        }
    }
}
```

### **3. Interface-Based Design**

Tất cả elements implement interfaces để đảm bảo consistency:

```php
// Interfaces
- FieldInterface: getId(), getType(), getTitle(), getArgs()
- PageInterface: getTitle()
- SectionInterface: getTitle()
```

## 📁 File Structure

```
dashboard-framework/
├── src/
│   ├── Elements/
│   │   ├── Field.php (Base field class)
│   │   ├── Page.php (Page container)
│   │   ├── Section.php (Section container)
│   │   └── Fields/
│   │       ├── TextField.php
│   │       ├── TextareaField.php
│   │       ├── SelectField.php
│   │       ├── ImageField.php
│   │       └── IconField.php
│   ├── Factories/
│   │   └── FieldFactory.php (Factory pattern)
│   ├── Interfaces/
│   │   ├── FieldInterface.php
│   │   ├── PageInterface.php
│   │   ├── SectionInterface.php
│   │   └── Fields/
│   │       ├── TextFieldInterface.php
│   │       ├── TextareaFieldInterface.php
│   │       ├── SelectFieldInterface.php
│   │       ├── ImageFieldInterface.php
│   │       └── IconFieldInterface.php
│   └── OptionFramework.php (Main framework)
├── dist/
│   ├── bundle.js (React components)
│   └── styles.css (UI styles)
└── README.md
```

## 🔧 Core Components

### **1. OptionFramework.php**

Class chính quản lý toàn bộ framework:

```php
class OptionFramework
{
    private $instance_name;
    private $page_title;
    private $menu_text;
    private $config;
    public $pages = [];

    public function __construct($instance_name)
    {
        $this->instance_name = $instance_name;
        $this->setupHooks();
    }

    private function setupHooks()
    {
        add_action('admin_menu', [$this, 'addOptionsPage']);
        add_action('admin_enqueue_scripts', [$this, 'enqueueScripts']);
        add_action('wp_ajax_save_options', [$this, 'saveOptions']);
        add_action('wp_ajax_fetch_options', [$this, 'fetchOptions']);
    }
}
```

### **2. Elements Layer**

#### **A. Base Field Class**
```php
abstract class Field implements FieldInterface, JsonSerializable
{
    protected $id;
    protected $title;
    protected $type;
    protected $args;

    public function __construct($id, $title, $args = [])
    {
        $this->id = $id;
        $this->title = $title;
        $this->args = $args;
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'type' => $this->type,
            'args' => $this->args,
        ];
    }
}
```

#### **B. Page Container**
```php
class Page implements PageInterface, JsonSerializable
{
    protected $title;
    protected $sections;

    public function addSection(Section $section)
    {
        $this->sections[] = $section;
    }

    public function jsonSerialize(): array
    {
        return [
            'title' => $this->title,
            'sections' => $this->sections,
        ];
    }
}
```

#### **C. Section Container**
```php
class Section implements SectionInterface, JsonSerializable
{
    protected $title;
    protected $fields;

    public function addField(Field $field)
    {
        $this->fields[] = $field;
    }

    public function jsonSerialize(): array
    {
        return [
            'title' => $this->title,
            'fields' => $this->fields,
        ];
    }
}
```

### **3. Field Types**

#### **A. TextField**
```php
class TextField extends Field implements TextFieldInterface
{
    protected $type = 'text';
}
```

#### **B. TextareaField**
```php
class TextareaField extends Field implements TextareaFieldInterface
{
    protected $type = 'textarea';
}
```

#### **C. SelectField**
```php
class SelectField extends Field implements SelectFieldInterface
{
    protected $type = 'select';

    public function getArgs()
    {
        return [
            'options' => [
                $this->id
            ]
        ];
    }
}
```

#### **D. ImageField**
```php
class ImageField extends Field implements ImageFieldInterface
{
    protected $type = 'image';
}
```

#### **E. IconField**
```php
class IconField extends Field implements IconFieldInterface
{
    protected $type = 'icon';
}
```

## 🚀 Usage Examples

### **1. Basic Setup**

```php
// Initialize framework
$framework = new OptionFramework('my_theme_options');

// Configure framework
$framework->setPageTitle('Theme Options')
    ->setMenuText('Theme Options')
    ->setConfig([
        'logo' => 'https://example.com/logo.png',
        'version' => '1.0.0',
        'description' => 'Configure your theme settings',
        'menu_position' => 59,
        'menu_icon' => 'dashicons-admin-customizer'
    ]);
```

### **2. Adding Pages and Sections**

```php
// Create page
$page = new Page('General Settings', []);

// Create section
$section = new Section('Site Information', []);

// Create field
$field = FieldFactory::create(
    'site_title',
    'Site Title',
    'text',
    ['default_value' => 'My Website']
);

// Add field to section
$section->addField($field);

// Add section to page
$page->addSection($section);

// Add page to framework
$framework->addPage($page);
```

### **3. Built-in Options Registration**

```php
// Register built-in options
OptionFramework::registerBuiltInOptions('my_theme_options', [
    'general' => [
        'title' => 'General Settings',
        'sections' => [
            'site_info' => [
                'title' => 'Site Information',
                'fields' => [
                    [
                        'id' => 'site_title',
                        'title' => 'Site Title',
                        'type' => 'text',
                        'default_value' => 'My Website'
                    ]
                ]
            ]
        ]
    ]
]);
```

## 🎨 UI Features

### **1. React-Based Interface**

- ✅ **Modern UI**: Clean và professional interface
- ✅ **Real-time Updates**: Live preview của changes
- ✅ **Responsive Design**: Works trên tất cả devices
- ✅ **Interactive Elements**: Drag & drop, sliders, etc.

### **2. WordPress Integration**

- ✅ **Media Uploader**: Native WordPress media picker
- ✅ **Icon Picker**: Dashicons integration
- ✅ **AJAX Support**: Save/load options không reload page
- ✅ **Security**: Nonce verification cho tất cả actions

### **3. Field Types Support**

| Field Type | Description | Features |
|------------|-------------|----------|
| `text` | Text input | Basic text input |
| `textarea` | Multi-line text | Large text areas |
| `select` | Dropdown select | Options list |
| `image` | Media upload | Image picker với preview |
| `icon` | Icon picker | Icon search và selection |

## 🔄 Data Flow

### **1. Save Flow**

```mermaid
graph LR
    A[React Form] --> B[AJAX Request]
    B --> C[WordPress AJAX]
    C --> D[Nonce Verification]
    D --> E[Data Validation]
    E --> F[Save to Database]
    F --> G[Success Response]
    G --> H[Update UI]
```

### **2. Load Flow**

```mermaid
graph LR
    A[Page Load] --> B[Fetch Options]
    B --> C[WordPress AJAX]
    C --> D[Get from Database]
    D --> E[Return JSON]
    E --> F[React State Update]
    F --> G[Render Form]
```

## 🛡️ Security Features

### **1. Nonce Verification**

```php
public function saveOptions()
{
    // Verify nonce
    if (!Jankx_Security_Helper::verify_nonce('nonce', 'save_options_nonce')) {
        wp_send_json_error('Nonce không hợp lệ');
        return;
    }

    // Process data
    $input_data = file_get_contents('php://input');
    $data = json_decode($input_data, true);

    // Validate và save
    if (is_array($data)) {
        $result = update_option($this->instance_name, json_encode($data));
        wp_send_json_success('Lưu options thành công');
    }
}
```

### **2. Input Sanitization**

- ✅ **JSON Validation**: Validate JSON data
- ✅ **Data Sanitization**: Sanitize input data
- ✅ **Capability Checks**: Check user permissions
- ✅ **Error Handling**: Proper error responses

## 🚀 Performance Features

### **1. Lazy Loading**

- ✅ **Conditional Loading**: Scripts chỉ load khi cần
- ✅ **Screen Detection**: Chỉ load trên options page
- ✅ **Asset Optimization**: Minified và compressed assets

### **2. Caching**

- ✅ **Configuration Caching**: Cache configuration data
- ✅ **Asset Caching**: Browser caching cho assets
- ✅ **Database Optimization**: Efficient option storage

## 🎯 Best Practices

### **1. Configuration Management**

```php
// Use configuration arrays
$config = [
    'logo' => 'https://example.com/logo.png',
    'version' => '1.0.0',
    'description' => 'Theme options configuration',
    'menu_position' => 59,
    'menu_icon' => 'dashicons-admin-customizer',
    'capability' => 'manage_options'
];

$framework->setConfig($config);
```

### **2. Field Organization**

```php
// Group related fields
$section = new Section('Typography Settings', []);

$section->addField(FieldFactory::create('body_font', 'Body Font', 'select', [
    'options' => ['Arial', 'Georgia', 'Times New Roman']
]));

$section->addField(FieldFactory::create('heading_font', 'Heading Font', 'select', [
    'options' => ['Arial', 'Georgia', 'Times New Roman']
]));
```

### **3. Error Handling**

```php
// Proper error handling
try {
    $field = FieldFactory::create($id, $title, $type, $args);
    if ($field instanceof FieldInterface) {
        $section->addField($field);
    }
} catch (Exception $e) {
    error_log('Failed to create field: ' . $e->getMessage());
}
```

## 🔧 Integration với Option Adapter

Dashboard Framework được thiết kế để tích hợp hoàn hảo với **option-adapter**:

### **1. Adapter Pattern**

```php
// JankxOptionFramework adapter
class JankxOptionFramework extends Adapter
{
    public function createSections($optionsReader)
    {
        $pages = $optionsReader->getPages();

        foreach ($pages as $page) {
            $dashboardPage = new Page($page->getTitle(), []);

            $sections = $optionsReader->getSections($page->getTitle());
            foreach ($sections as $section) {
                $dashboardSection = new Section($section->getTitle(), []);

                $fields = $optionsReader->getFields($section->getTitle());
                foreach ($fields as $field) {
                    $dashboardField = FieldFactory::create(
                        $field->getId(),
                        $field->getTitle(),
                        $field->getType(),
                        $field->getArgs()
                    );

                    $dashboardSection->addField($dashboardField);
                }

                $dashboardPage->addSection($dashboardSection);
            }

            $this->framework->addPage($dashboardPage);
        }
    }
}
```

### **2. Configuration Flow**

```
File Config → OptionsReader → ConfigRepository →
Dashboard Framework Elements → React UI → WordPress Admin
```

## 📚 Related Documentation

- [Option Adapter Documentation](../option-adapter/docs/README.md)
- [Jankx Framework Documentation](../../docs/README.md)
- [Gutenberg Integration](../../docs/gutenberg/README.md)

---

**Version**: 1.0.0
**Author**: Puleeno Nguyen
**License**: MIT
