import TextField from './TextField';
import TextareaField from './TextareaField';
import SelectField from './SelectField';
import ImageField from './ImageField';
import IconField from './IconField';
import ColorField from './ColorField';
import CheckboxField from './CheckboxField';
import RadioField from './RadioField';
import SwitchField from './SwitchField';
import MediaField from './MediaField';
import RepeaterField from './RepeaterField';

export default class FieldFactory {
    static create(id, field, onChange) {
        switch (field.type) {
            case 'text':
            case 'input':
                return new TextField(id, field, onChange);
            case 'textarea':
                return new TextareaField(id, field, onChange);
            case 'select':
                return new SelectField(id, field, onChange);
            case 'image':
                return new ImageField(id, field, onChange);
            case 'icon':
                return new IconField(id, field, onChange);
            case 'color':
            case 'color_picker':
                return new ColorField(id, field, onChange);
            case 'checkbox':
                return new CheckboxField(id, field, onChange);
            case 'radio':
                return new RadioField(id, field, onChange);
            case 'switch':
                return new SwitchField(id, field, onChange);
            case 'media':
            case 'upload':
                return new MediaField(id, field, onChange);
            case 'repeater':
            case 'group':
                return new RepeaterField(id, field, onChange);
            default:
                console.warn(`Unsupported field type: ${field.type}`);
                return null;
        }
    }
}