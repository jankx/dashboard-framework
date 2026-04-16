import React, { useEffect } from 'react';
import { FieldProps } from '../types';
import { Upload, Italic, Type } from 'lucide-react';
// Import coloris directly (bundled, no CDN)
import Coloris from '@melloware/coloris';

export const FieldColor: React.FC<FieldProps> = ({ value, onChange }) => {
    useEffect(() => {
        // Initialize coloris (bundled, no async needed)
        try {
            if (Coloris && typeof Coloris.init === 'function') {
                Coloris.init();
                Coloris({ el: '.coloris', theme: 'polaroid', themeMode: 'light', format: 'hex', formatToggle: true });
            }
        } catch (e) {
            console.warn('Coloris initialization error:', e);
        }
    }, []);

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input type="text" className="jankx-input coloris" style={{ width: '120px' }} value={value || ''} onChange={(e) => onChange(e.target.value)} data-coloris />
            <div style={{ width: '36px', height: '36px', borderRadius: '4px', border: '1px solid #ccc', background: value || '#fff' }}></div>
        </div>
    );

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input type="text" className="jankx-input coloris" style={{ width: '120px' }} value={value || ''} onChange={(e) => onChange(e.target.value)} data-coloris />
            <div style={{ width: '36px', height: '36px', borderRadius: '4px', border: '1px solid #ccc', background: value || '#fff' }}></div>
        </div>
    );
};

export const FieldSpacing: React.FC<FieldProps> = ({ value, onChange }) => {
    const data = value || { top: '', right: '', bottom: '', left: '', unit: 'px' };
    const update = (k: string, v: string) => onChange({ ...data, [k]: v });

    return (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {['top', 'right', 'bottom', 'left'].map(side => (
                <div key={side} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <input
                        type="number"
                        className="jankx-input"
                        style={{ width: '60px', textAlign: 'center' }}
                        placeholder="0"
                        value={data[side] || ''}
                        onChange={e => update(side, e.target.value)}
                    />
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#999' }}>{side}</span>
                </div>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                <select
                    className="jankx-input"
                    style={{ width: '60px', paddingRight: '15px' }}
                    value={data.unit}
                    onChange={e => update('unit', e.target.value)}
                >
                    <option value="px">px</option>
                    <option value="em">em</option>
                    <option value="%">%</option>
                </select>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#999' }}>Unit</span>
            </div>
        </div>
    );
};

export const FieldDimensions: React.FC<FieldProps> = ({ value, onChange }) => {
    const data = value || { width: '', height: '', unit: 'px' };
    const update = (k: string, v: string) => onChange({ ...data, [k]: v });

    return (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '8px', top: '9px', fontSize: '11px', color: '#999' }}>W</span>
                <input type="number" className="jankx-input" style={{ width: '100px', paddingLeft: '25px' }} value={data.width} onChange={e => update('width', e.target.value)} />
            </div>
            <span style={{ color: '#ccc' }}>x</span>
            <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '8px', top: '9px', fontSize: '11px', color: '#999' }}>H</span>
                <input type="number" className="jankx-input" style={{ width: '100px', paddingLeft: '25px' }} value={data.height} onChange={e => update('height', e.target.value)} />
            </div>
            <select className="jankx-input" style={{ width: '70px' }} value={data.unit} onChange={e => update('unit', e.target.value)}>
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="vh">vh</option>
            </select>
        </div>
    );
};

export const FieldBackground: React.FC<FieldProps> = ({ value, onChange }) => {
    const data = value || { color: '', image: '', repeat: 'no-repeat', size: 'cover', position: 'center center', attachment: 'scroll' };
    const update = (k: string, v: any) => onChange({ ...data, [k]: v });

    return (
        <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '4px', background: '#f9f9f9', maxWidth: '600px' }}>
            <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                    <label className="jankx-label-desc">Background Color</label>
                    <FieldColor field={{} as any} value={data.color} onChange={v => update('color', v)} />
                </div>
                <div style={{ flex: 2 }}>
                    <label className="jankx-label-desc">Background Image</label>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <input type="text" className="jankx-input" value={data.image} onChange={e => update('image', e.target.value)} placeholder="http://..." />
                        <button className="jankx-btn jankx-btn-primary"><Upload size={14} /> </button>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                    <label className="jankx-label-desc">Repeat</label>
                    <select className="jankx-input" value={data.repeat} onChange={e => update('repeat', e.target.value)}>
                        <option value="no-repeat">No Repeat</option>
                        <option value="repeat">Repeat All</option>
                        <option value="repeat-x">Repeat X</option>
                        <option value="repeat-y">Repeat Y</option>
                    </select>
                </div>
                <div>
                    <label className="jankx-label-desc">Size</label>
                    <select className="jankx-input" value={data.size} onChange={e => update('size', e.target.value)}>
                        <option value="cover">Cover</option>
                        <option value="contain">Contain</option>
                        <option value="auto">Auto</option>
                    </select>
                </div>
                <div>
                    <label className="jankx-label-desc">Position</label>
                    <select className="jankx-input" value={data.position} onChange={e => update('position', e.target.value)}>
                        <option value="center center">Center Center</option>
                        <option value="top left">Top Left</option>
                        <option value="bottom right">Bottom Right</option>
                    </select>
                </div>
                <div>
                    <label className="jankx-label-desc">Attachment</label>
                    <select className="jankx-input" value={data.attachment} onChange={e => update('attachment', e.target.value)}>
                        <option value="scroll">Scroll</option>
                        <option value="fixed">Fixed</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export const FieldTypography: React.FC<FieldProps> = ({ value, onChange }) => {
    const typo = value || {};
    const update = (k: string, v: any) => onChange({ ...typo, [k]: v });

    return (
        <div className="jankx-typography-field-wrapper" style={{
            padding: '12px',
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
        }}>
            {/* Font Family Selection */}
            <div className="jankx-field-row" style={{ marginBottom: '12px' }}>
                <label className="jankx-label-desc" style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>Font Family</label>
                <select className="jankx-input" style={{ width: '100%' }} value={typo.fontFamily} onChange={e => update('fontFamily', e.target.value)}>
                    <option value="Inter">Inter (Server)</option>
                    <option value="System">System Default</option>
                    <option value="Arial">Arial</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Times New Roman">Times New Roman</option>
                </select>
            </div>

            {/* Size & Weight Group */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <div style={{ flex: 1 }}>
                    <label className="jankx-label-desc" style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>Size (px)</label>
                    <input type="number" className="jankx-input" style={{ width: '100%' }} value={typo.fontSize} onChange={e => update('fontSize', e.target.value)} />
                </div>
                <div style={{ flex: 1 }}>
                    <label className="jankx-label-desc" style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>Weight</label>
                    <select className="jankx-input" style={{ width: '100%' }} value={typo.fontWeight} onChange={e => update('fontWeight', e.target.value)}>
                        <option value="300">Light</option>
                        <option value="400">Regular</option>
                        <option value="500">Medium</option>
                        <option value="600">Semi-Bold</option>
                        <option value="700">Bold</option>
                        <option value="900">Black</option>
                    </select>
                </div>
            </div>

            {/* Color & Style Group */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                <div style={{ flex: 1 }}>
                    <label className="jankx-label-desc" style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>Color</label>
                    <FieldColor field={{} as any} value={typo.color} onChange={v => update('color', v)} />
                </div>
                <div className="jankx-toolbar" style={{ display: 'flex', gap: '4px' }}>
                    <button
                        title="Italic"
                        className={`jankx-btn ${typo.style === 'italic' ? 'active' : ''}`}
                        style={{
                            padding: '6px',
                            background: typo.style === 'italic' ? '#eee' : '#fff',
                            border: '1px solid #ccc',
                            borderRadius: '3px'
                        }}
                        onClick={() => update('style', typo.style === 'italic' ? 'normal' : 'italic')}>
                        <Italic size={16} />
                    </button>
                    <button
                        title="Uppercase"
                        className={`jankx-btn ${typo.transform === 'uppercase' ? 'active' : ''}`}
                        style={{
                            padding: '6px',
                            background: typo.transform === 'uppercase' ? '#eee' : '#fff',
                            border: '1px solid #ccc',
                            borderRadius: '3px'
                        }}
                        onClick={() => update('transform', typo.transform === 'uppercase' ? 'none' : 'uppercase')}>
                        <Type size={16} />
                    </button>
                </div>
            </div>

            {/* Dynamic Preview Area */}
            <div className="jankx-typo-preview" style={{
                marginTop: '15px',
                padding: '10px',
                borderTop: '1px solid #eee',
                textAlign: 'center',
                fontSize: `${typo.fontSize || 14}px`,
                fontWeight: typo.fontWeight || 400,
                fontStyle: typo.style || 'normal',
                textTransform: typo.transform || 'none',
                color: typo.color || '#333',
                fontFamily: typo.fontFamily || 'inherit',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
            }}>
                The quick brown fox jumps...
            </div>
        </div>
    );
};
