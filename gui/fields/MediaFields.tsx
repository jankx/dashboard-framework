import React from 'react';
import { FieldProps } from '../types';
import { Image as ImageIcon, Plus, X } from 'lucide-react';

export const FieldMedia: React.FC<FieldProps> = ({ value, onChange }) => {
    return (
        <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
            <input type="text" className="jankx-input" value={value || ''} onChange={e => onChange(e.target.value)} placeholder="http://" />
            <button className="jankx-btn jankx-btn-primary">
                <ImageIcon size={16} /> <span>Select Image</span>
            </button>
            {value && (
                <div style={{width: '40px', height: '40px', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden'}}>
                    <img src={value} alt="Preview" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                </div>
            )}
        </div>
    );
};

export const FieldGallery: React.FC<FieldProps> = ({ value, onChange }) => {
    const images: string[] = Array.isArray(value) ? value : [];
    const removeImg = (idx: number) => onChange(images.filter((_, i) => i !== idx));

    return (
        <div>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
                {images.map((img, idx) => (
                    <div key={idx} style={{position: 'relative', width: '80px', height: '80px', border: '1px solid #ccc', borderRadius: '4px'}}>
                        <img src={img} alt="" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px'}} />
                        <button 
                            onClick={() => removeImg(idx)}
                            style={{position: 'absolute', top: -5, right: -5, background: 'red', color: 'white', borderRadius: '50%', border: 'none', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}
                        >
                            <X size={12} />
                        </button>
                    </div>
                ))}
            </div>
            <button className="jankx-btn jankx-btn-primary">
                <Plus size={16} /> <span>Add Images</span>
            </button>
        </div>
    );
};
