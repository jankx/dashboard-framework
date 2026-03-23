const React = (window as any).wp.element; import { FieldTypography } from './fields/DesignFields';
import './assets/styles.scss';

/**
 * Access WordPress React/ReactDOM from wp-element dependency
 */
const { render, useState, createElement } = (window as any).wp.element;
const wp = (window as any).wp;

interface CustomizerTypographyProps {
    id: string;
    initialValue: any;
}

const CustomizerTypographyWrapper: React.FC<CustomizerTypographyProps> = ({ id, initialValue }) => {
    const [value, setValue] = useState(initialValue || {});

    const handleChange = (newValue: any) => {
        setValue(newValue);
        if (wp && wp.customize && wp.customize(id)) {
            // Sync back to WordPress Customizer setting
            wp.customize(id).set(newValue);
        }
    };

    return createElement(
        'div',
        {
            className: "jankx-customizer-typography-field",
            style: {
                padding: '5px 0',
                background: 'transparent'
            }
        },
        createElement(FieldTypography, {
            field: { id, type: 'typography' } as any,
            value: value,
            onChange: handleChange
        })
    );
};

const mountTypography = (control: any, retry = 0) => {
    const container = control.container[0];
    const mountPoint = container.querySelector('.jankx-typography-mount-point');

    if (mountPoint) {
        const initialValue = control.setting.get();
        render(createElement(CustomizerTypographyWrapper, { id: control.id, initialValue: initialValue }), mountPoint);
    } else {
        if (retry < 50) {
            setTimeout(() => mountTypography(control, retry + 1), 300);
        }
    }
};

const initJankxCustomizer = () => {
    if (typeof wp === 'undefined' || !wp.customize || !wp.customize.control) {
        return;
    }

    wp.customize.control.each((control: any) => {
        if (control.params.type === 'jankx-typography') {
            control.container.ready(() => mountTypography(control));
        }
    });
};

if (typeof wp !== 'undefined' && wp.customize) {
    wp.customize.bind('ready', initJankxCustomizer);
}
