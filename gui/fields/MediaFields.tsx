import React from 'react';
import { FieldProps } from '../types';
import { Image as ImageIcon, Plus, X } from 'lucide-react';

export const FieldMedia: React.FC<FieldProps> = ({ field, value, onChange }) => {
    const handleSelect = () => {
        if (!window.wp || !window.wp.media) {
            alert('WordPress Media Library not available');
            return;
        }

        const frame = window.wp.media({
            title: field.title || 'Select Image',
            button: { text: 'Use this image' },
            library: { type: 'image' },
            multiple: false
        });

        frame.on('select', () => {
            const attachment = frame.state().get('selection').first().toJSON();
            onChange(attachment.url);
        });

        frame.open();
    };

    return (
        <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
            <input 
                type="text" 
                className="jankx-input" 
                value={value || ''} 
                onChange={e => onChange(e.target.value)} 
                placeholder="http://" 
            />
            <button 
                type="button"
                className="jankx-btn jankx-btn-primary" 
                onClick={handleSelect}
                style={{whiteSpace: 'nowrap'}}
            >
                <ImageIcon size={16} /> <span>Select Image</span>
            </button>
            {value && (
                <div style={{
                    width: '40px', 
                    height: '40px', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px', 
                    overflow: 'hidden',
                    background: '#eee',
                    flexShrink: 0
                }}>
                    <img src={value} alt="Preview" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                </div>
            )}
        </div>
    );
};

export const FieldGallery: React.FC<FieldProps> = ({ field, value, onChange }) => {
    const images: string[] = Array.isArray(value) ? value : [];
    
    const handleSelect = () => {
        if (!window.wp || !window.wp.media) {
            alert('WordPress Media Library not available');
            return;
        }

        const frame = window.wp.media({
            title: field.title || 'Select Gallery Images',
            button: { text: 'Add to Gallery' },
            library: { type: 'image' },
            multiple: true
        });

        frame.on('select', () => {
            const selection = frame.state().get('selection');
            const newImages = selection.map((attachment: any) => attachment.toJSON().url);
            onChange([...images, ...newImages]);
        });

        frame.open();
    };

    const removeImg = (idx: number) => onChange(images.filter((_, i) => i !== idx));

    return (
        <div>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
                {images.map((img, idx) => (
                    <div key={idx} style={{position: 'relative', width: '80px', height: '80px', border: '1px solid #ccc', borderRadius: '4px', background: '#eee'}}>
                        <img src={img} alt="" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px'}} />
                        <button 
                            type="button"
                            onClick={() => removeImg(idx)}
                            style={{
                                position: 'absolute', 
                                top: -6, 
                                right: -6, 
                                background: '#dc3232', 
                                color: 'white', 
                                borderRadius: '50%', 
                                border: 'none', 
                                width: '20px', 
                                height: '20px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                cursor: 'pointer',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                            }}
                        >
                            <X size={12} />
                        </button>
                    </div>
                ))}
            </div>
            <button 
                type="button"
                className="jankx-btn jankx-btn-primary" 
                onClick={handleSelect}
            >
                <Plus size={16} /> <span>Add Images</span>
            </button>
        </div>
    );
};
