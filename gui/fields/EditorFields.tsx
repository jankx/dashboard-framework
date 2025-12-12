import React from 'react';
import { FieldProps } from '../types';
import { Bold, Italic, Link } from 'lucide-react';

export const FieldEditor: React.FC<FieldProps> = ({ field, value, onChange }) => (
    <div style={{border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden'}}>
        <div style={{background: '#f0f0f1', padding: '5px', borderBottom: '1px solid #ccc', display: 'flex', gap: '5px'}}>
            <button className="jankx-btn-icon"><Bold size={16}/></button>
            <button className="jankx-btn-icon"><Italic size={16}/></button>
            <button className="jankx-btn-icon"><Link size={16}/></button>
        </div>
        <textarea 
            className="jankx-input" 
            style={{border: 'none', borderRadius: 0, minHeight: '150px'}} 
            value={value || ''} 
            onChange={e => onChange(e.target.value)} 
        />
    </div>
);

export const FieldAceEditor: React.FC<FieldProps> = ({ field, value, onChange }) => (
    <div style={{position: 'relative'}}>
        <div style={{background: '#2d2d2d', color: '#fff', padding: '5px 10px', fontSize: '12px', borderTopLeftRadius: '4px', borderTopRightRadius: '4px'}}>
            JavaScript / CSS
        </div>
        <textarea 
            value={value || ''} 
            onChange={e => onChange(e.target.value)} 
            style={{
                width: '100%', 
                minHeight: '200px', 
                background: '#1e1e1e', 
                color: '#d4d4d4', 
                fontFamily: 'monospace', 
                padding: '10px', 
                border: 'none',
                borderBottomLeftRadius: '4px', 
                borderBottomRightRadius: '4px'
            }}
        />
    </div>
);
