import React from 'react';
import { FieldProps } from '../types';
import { Check } from 'lucide-react';

interface SvgChooserOption {
    label?: string;
    svg?: string;       // raw SVG string
    svg_url?: string;   // URL to SVG file
}

const SvgThumbnail: React.FC<{ option: SvgChooserOption; width?: string | number; height?: string | number }> = ({ option, width, height }) => {
    const style: React.CSSProperties = {
        width: width || '100%',
        height: height || 'auto',
        maxHeight: height ? 'none' : '70px',
        objectFit: 'contain',
    };

    if (option.svg) {
        return (
            <span
                className="jankx-svg-chooser__thumb"
                dangerouslySetInnerHTML={{ __html: option.svg }}
                style={style}
            />
        );
    }
    if (option.svg_url) {
        return <img className="jankx-svg-chooser__thumb" src={option.svg_url} alt={option.label || ''} style={style} />;
    }
    // fallback placeholder
    return (
        <span className="jankx-svg-chooser__thumb jankx-svg-chooser__thumb--placeholder" style={style}>
            <svg viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="72" height="52" rx="4" fill="currentColor" opacity="0.15" />
                <rect x="10" y="10" width="22" height="40" rx="2" fill="currentColor" opacity="0.3" />
                <rect x="38" y="10" width="34" height="18" rx="2" fill="currentColor" opacity="0.3" />
                <rect x="38" y="32" width="34" height="18" rx="2" fill="currentColor" opacity="0.3" />
            </svg>
        </span>
    );
};

export const FieldSvgChooser: React.FC<FieldProps> = ({ field, value, onChange }) => {
    const options = (field as any).options as Record<string, SvgChooserOption> ?? {};
    const columns = (field as any).columns ?? 3;
    const showLabels = (field as any).show_labels !== false;
    const width = (field as any).width;
    const height = (field as any).height;
    const currentValue = value || field.default || '';

    return (
        <div
            className="jankx-svg-chooser"
            style={{
                '--jankx-svg-chooser-cols': columns,
                ...(height ? { '--jankx-svg-chooser-height': height } : {})
            } as any}
        >
            {Object.entries(options).map(([key, option]) => {
                const isSelected = currentValue === key;
                return (
                    <button
                        key={key}
                        type="button"
                        className={`jankx-svg-chooser__item${isSelected ? ' is-selected' : ''}`}
                        onClick={() => onChange(key)}
                        aria-pressed={isSelected}
                        title={option.label || key}
                    >
                        {/* Checkmark badge */}
                        <span className="jankx-svg-chooser__check" aria-hidden="true">
                            <Check size={14} strokeWidth={3} />
                        </span>

                        {/* SVG Thumbnail */}
                        <span className="jankx-svg-chooser__preview">
                            <SvgThumbnail option={option} width={width} height={height} />
                        </span>

                        {/* Label */}
                        {showLabels && option.label && (
                            <span className="jankx-svg-chooser__label">{option.label}</span>
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default FieldSvgChooser;
