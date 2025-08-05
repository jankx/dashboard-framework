# Dashboard Framework Field Types

Dashboard Framework hỗ trợ nhiều loại field khác nhau để tạo giao diện options đa dạng và mạnh mẽ.

## 📋 **Basic Fields**

### **1. TextField**
```php
$field = new TextField('site_title', 'Site Title', [
    'default' => 'My Website',
    'placeholder' => 'Enter site title',
    'description' => 'The main title of your website'
]);
```

### **2. TextareaField**
```php
$field = new TextareaField('site_description', 'Site Description', [
    'default' => '',
    'rows' => 5,
    'placeholder' => 'Enter site description'
]);
```

### **3. SelectField**
```php
$field = new SelectField('layout_type', 'Layout Type', [
    'options' => [
        'full-width' => 'Full Width',
        'boxed' => 'Boxed',
        'contained' => 'Contained'
    ],
    'default' => 'full-width'
]);
```

### **4. CheckboxField**
```php
$field = new CheckboxField('enable_feature', 'Enable Feature', [
    'default' => false,
    'description' => 'Enable this feature for your website'
]);
```

### **5. RadioField**
```php
$field = new RadioField('header_style', 'Header Style', [
    'options' => [
        'style1' => 'Style 1',
        'style2' => 'Style 2',
        'style3' => 'Style 3'
    ],
    'default' => 'style1',
    'layout' => 'horizontal' // horizontal, vertical
]);
```

## 🎨 **Color & Design Fields**

### **6. ColorField**
```php
$field = new ColorField('primary_color', 'Primary Color', [
    'default' => '#007cba',
    'transparent' => false,
    'alpha' => false
]);
```

### **7. TypographyField**
```php
$field = new TypographyField('body_typography', 'Body Typography', [
    'font-family' => true,
    'font-size' => true,
    'font-weight' => true,
    'line-height' => true,
    'color' => true,
    'google' => true,
    'default' => [
        'font-family' => 'Arial, sans-serif',
        'font-size' => '16px',
        'font-weight' => '400',
        'line-height' => '1.6',
        'color' => '#333333'
    ]
]);
```

### **8. BackgroundField**
```php
$field = new BackgroundField('header_background', 'Header Background', [
    'background-color' => true,
    'background-image' => true,
    'background-repeat' => true,
    'background-position' => true,
    'background-size' => true,
    'default' => [
        'background-color' => '#ffffff',
        'background-image' => '',
        'background-repeat' => 'no-repeat',
        'background-position' => 'center center',
        'background-size' => 'cover'
    ]
]);
```

### **9. SpacingField**
```php
$field = new SpacingField('content_padding', 'Content Padding', [
    'mode' => 'padding', // margin, padding
    'units' => ['px', 'em', '%'],
    'top' => true,
    'right' => true,
    'bottom' => true,
    'left' => true,
    'default' => [
        'top' => '20px',
        'right' => '20px',
        'bottom' => '20px',
        'left' => '20px',
        'units' => 'px'
    ]
]);
```

## 🎛️ **Interactive Fields**

### **10. SwitchField**
```php
$field = new SwitchField('enable_animations', 'Enable Animations', [
    'default' => true,
    'on' => 'Enabled',
    'off' => 'Disabled',
    'description' => 'Enable smooth animations throughout the site'
]);
```

### **11. SliderField**
```php
$field = new SliderField('content_width', 'Content Width', [
    'min' => 800,
    'max' => 1400,
    'step' => 10,
    'default' => 1200,
    'display_value' => true,
    'resolution' => 1
]);
```

## 🖼️ **Media Fields**

### **12. ImageField**
```php
$field = new ImageField('logo', 'Site Logo', [
    'default' => '',
    'description' => 'Upload your site logo'
]);
```

### **13. IconField**
```php
$field = new IconField('menu_icon', 'Menu Icon', [
    'default' => 'fa-bars',
    'description' => 'Choose an icon for the menu'
]);
```

## 🔧 **Usage Examples**

### **Creating Fields via Factory**
```php
use Jankx\Dashboard\Factories\FieldFactory;

// Create a text field
$textField = FieldFactory::create('site_title', 'Site Title', 'text', [
    'default' => 'My Website'
]);

// Create a color field
$colorField = FieldFactory::create('primary_color', 'Primary Color', 'color', [
    'default' => '#007cba'
]);

// Create a typography field
$typographyField = FieldFactory::create('body_typography', 'Body Typography', 'typography', [
    'font-family' => true,
    'font-size' => true,
    'color' => true
]);
```

### **ArrayAccess Support**
```php
// All fields support array access
$field = new TextField('site_title', 'Site Title', []);
echo $field['id'];        // 'site_title'
echo $field['title'];     // 'Site Title'
echo $field['type'];      // 'text'

// Set properties
$field['title'] = 'New Title';
$field['args']['default'] = 'New Default';
```

## 📊 **Field Type Mapping**

| Dashboard Type | Redux Type | Description |
|---------------|------------|-------------|
| `text` | `text` | Basic text input |
| `textarea` | `textarea` | Multi-line text |
| `select` | `select` | Dropdown select |
| `checkbox` | `checkbox` | Checkbox field |
| `radio` | `radio` | Radio buttons |
| `color` | `color` | Color picker |
| `switch` | `switch` | Toggle switch |
| `slider` | `slider` | Range slider |
| `typography` | `typography` | Typography settings |
| `background` | `background` | Background settings |
| `spacing` | `spacing` | Spacing/dimensions |
| `image` | `media` | Image upload |
| `icon` | `icon_select` | Icon selector |

## 🎯 **Next Steps**

Với cấu trúc field types này, chúng ta có thể:

1. **Tạo Redux Transformer**: Chuyển đổi từ Redux configs sang Dashboard Framework
2. **Tạo React Components**: Xây dựng UI components cho từng field type
3. **Tạo Validation**: Thêm validation rules cho từng field
4. **Tạo Save/Load**: Implement save/load functionality cho options