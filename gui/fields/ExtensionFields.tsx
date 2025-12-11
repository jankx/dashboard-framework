import React, { useState } from 'react';
import { FieldProps } from '../types';
import { 
  ArrowUp, ArrowDown, Trash2, Plus, Move, 
  ChevronDown, ChevronRight, Globe, Link, Mail, Phone, MapPin, 
  Video, Music, ShoppingCart, Star, Heart, Zap, Coffee, Gamepad, 
  Send, MessageCircle, Facebook, Twitter, Instagram, Linkedin, 
  Youtube, Github 
} from 'lucide-react';
import { ReduxFieldRenderer } from './ReduxFields';

// --- ICON LIBRARY ---
const ICON_LIBRARY: Record<string, any> = {
    Facebook, Twitter, Instagram, Linkedin, Youtube, Github,
    Globe, Link, Mail, Phone, MapPin, Video, Music, ShoppingCart, 
    Star, Heart, Zap, Coffee, Gamepad, Send, MessageCircle
};

const AVAILABLE_ICONS = Object.keys(ICON_LIBRARY);

export const FieldSocialProfiles: React.FC<FieldProps> = ({ value, onChange }) => {
    const profiles: any[] = Array.isArray(value) ? value : [];
    const [isAdding, setIsAdding] = useState(false);
    const [newItem, setNewItem] = useState({ label: '', url: '', icon: 'Globe' });
    
    const move = (idx: number, dir: number) => {
        if (idx + dir < 0 || idx + dir >= profiles.length) return;
        const newArr = [...profiles];
        const temp = newArr[idx];
        newArr[idx] = newArr[idx + dir];
        newArr[idx + dir] = temp;
        onChange(newArr);
    };

    const updateProfile = (idx: number, key: string, val: any) => {
        const newArr = [...profiles];
        newArr[idx] = { ...newArr[idx], [key]: val };
        onChange(newArr);
    };

    const toggleEnable = (idx: number) => updateProfile(idx, 'enabled', !profiles[idx].enabled);

    const removeProfile = (idx: number) => {
        if(confirm('Delete this profile?')) {
             onChange(profiles.filter((_, i) => i !== idx));
        }
    }

    const handleAddItem = () => {
        if (!newItem.label) return alert("Label is required");
        const id = newItem.label.toLowerCase().replace(/\s+/g, '_');
        onChange([...profiles, { ...newItem, id, enabled: true }]);
        setIsAdding(false);
        setNewItem({ label: '', url: '', icon: 'Globe' });
    };

    return (
        <div style={{border: '1px solid #e5e5e5', borderRadius: '4px', background: '#fff', maxWidth: '600px', overflow: 'hidden'}}>
            {profiles.map((p, idx) => {
                const Icon = ICON_LIBRARY[p.id] || ICON_LIBRARY[p.icon] || Globe;
                return (
                    <div key={idx} style={{display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderBottom: '1px solid #eee', background: p.enabled ? '#fff' : '#fcfcfc', opacity: p.enabled ? 1 : 0.6}}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <button onClick={() => move(idx, -1)} className="jankx-btn-icon" style={{padding: 0}}><ArrowUp size={12} /></button>
                            <button onClick={() => move(idx, 1)} className="jankx-btn-icon" style={{padding: 0}}><ArrowDown size={12} /></button>
                        </div>
                        <div 
                            onClick={() => toggleEnable(idx)}
                            style={{width: '32px', height: '32px', borderRadius: '4px', background: p.enabled ? 'var(--jankx-primary)' : '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', flexShrink: 0}}
                        >
                            <Icon size={18} />
                        </div>
                        <div style={{flex: 1}}>
                             <div style={{fontWeight: 600, fontSize: '13px'}}>{p.label || p.id}</div>
                             {p.enabled && (
                                 <input 
                                    type="text" 
                                    className="jankx-input" 
                                    style={{marginTop: '5px', height: '30px', fontSize: '13px'}} 
                                    placeholder="Profile URL" 
                                    value={p.url} 
                                    onChange={e => updateProfile(idx, 'url', e.target.value)}
                                />
                             )}
                        </div>
                        <div style={{marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <div style={{fontSize: '11px', fontWeight: 'bold', color: p.enabled ? 'var(--jankx-success)' : '#ccc', textTransform: 'uppercase'}}>
                                {p.enabled ? 'Active' : 'Disabled'}
                            </div>
                            <button onClick={() => removeProfile(idx)} className="jankx-btn-icon" style={{color: '#999'}} title="Remove Profile"><Trash2 size={14} /></button>
                        </div>
                    </div>
                );
            })}

            {isAdding ? (
                <div style={{padding: '15px', background: '#f9f9f9', borderTop: '1px solid #eee'}}>
                    <h4 style={{marginTop: 0, marginBottom: '10px', fontSize: '13px'}}>Add New Profile</h4>
                    <div style={{display: 'flex', gap: '10px', marginBottom: '10px'}}>
                        <div style={{flex: 1}}>
                            <label className="jankx-label-desc">Label</label>
                            <input className="jankx-input" value={newItem.label} onChange={e => setNewItem({...newItem, label: e.target.value})} placeholder="e.g. TikTok" />
                        </div>
                        <div style={{flex: 1}}>
                             <label className="jankx-label-desc">URL</label>
                             <input className="jankx-input" value={newItem.url} onChange={e => setNewItem({...newItem, url: e.target.value})} placeholder="https://..." />
                        </div>
                    </div>
                    
                    <label className="jankx-label-desc">Select Icon</label>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '15px', maxHeight: '100px', overflowY: 'auto', border: '1px solid #ddd', padding: '5px', borderRadius: '4px', background: 'white'}}>
                        {AVAILABLE_ICONS.map(iconKey => {
                            const Icon = ICON_LIBRARY[iconKey];
                            const isSelected = newItem.icon === iconKey;
                            return (
                                <button 
                                    key={iconKey}
                                    onClick={() => setNewItem({...newItem, icon: iconKey})}
                                    style={{
                                        border: isSelected ? '1px solid var(--jankx-primary)' : '1px solid transparent',
                                        background: isSelected ? '#e5f5fa' : 'transparent',
                                        borderRadius: '3px',
                                        padding: '5px',
                                        cursor: 'pointer',
                                        color: isSelected ? 'var(--jankx-primary)' : '#666',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    title={iconKey}
                                >
                                    <Icon size={16} />
                                </button>
                            )
                        })}
                    </div>

                    <div style={{display: 'flex', gap: '10px'}}>
                        <button onClick={handleAddItem} className="jankx-btn jankx-btn-primary">Add Profile</button>
                        <button onClick={() => setIsAdding(false)} className="jankx-btn">Cancel</button>
                    </div>
                </div>
            ) : (
                <div style={{padding: '10px', background: '#f6f7f7', borderTop: '1px solid #eee', textAlign: 'right'}}>
                     <button onClick={() => setIsAdding(true)} className="jankx-btn jankx-btn-primary"><Plus size={14}/> <span>Add Custom Profile</span></button>
                </div>
            )}
        </div>
    );
};

export const FieldSortable: React.FC<FieldProps> = ({ field, value, onChange }) => {
    const activeKeys: string[] = Array.isArray(value) ? value : [];
    const allOptions = field.options || {};
    
    const handleToggle = (key: string) => {
        if (activeKeys.includes(key)) onChange(activeKeys.filter(k => k !== key));
        else onChange([...activeKeys, key]);
    };

    return (
        <div style={{maxWidth: '400px'}}>
            <p style={{fontSize: '12px', color: '#666', marginBottom: '8px'}}>Check to enable. Drag to reorder (simulated).</p>
            {Object.entries(allOptions).map(([key, label]) => {
                const isActive = activeKeys.includes(key);
                return (
                    <div key={key} style={{padding: '8px 12px', marginBottom: '5px', border: '1px solid #ddd', borderRadius: '4px', background: '#fff', display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <input type="checkbox" checked={isActive} onChange={() => handleToggle(key)} />
                        <span style={{flex: 1, color: isActive ? '#333' : '#999'}}>{label}</span>
                        <Move size={14} color="#ccc" />
                    </div>
                )
            })}
        </div>
    );
};

export const FieldRepeater: React.FC<FieldProps> = ({ field, value, onChange, allData, onBatchUpdate }) => {
    const rows: any[] = Array.isArray(value) ? value : [];
    const [openRows, setOpenRows] = useState<Record<number, boolean>>({});

    const toggleRow = (idx: number) => setOpenRows(prev => ({ ...prev, [idx]: !prev[idx] }));
    const addRow = () => {
        onChange([...rows, {}]);
        setOpenRows(prev => ({ ...prev, [rows.length]: true }));
    };
    const removeRow = (idx: number) => {
        if (confirm('Remove item?')) onChange(rows.filter((_, i) => i !== idx));
    };
    const updateRowField = (rowIdx: number, fieldId: string, newVal: any) => {
        const newRows = [...rows];
        newRows[rowIdx] = { ...newRows[rowIdx], [fieldId]: newVal };
        onChange(newRows);
    };
    const getRowTitle = (row: any, idx: number) => {
        if (field.group_values && field.fields && field.fields.length > 0) {
            const firstId = field.fields[0].id;
            return row[firstId] || `Item ${idx + 1}`;
        }
        return `Item ${idx + 1}`;
    };

    return (
        <div className="jankx-repeater">
            <div className="jankx-repeater-header">
                <strong>{field.title || 'Repeater'}</strong>
            </div>
            <div>
                {rows.map((row, idx) => {
                    const isOpen = openRows[idx];
                    return (
                        <div key={idx} style={{borderBottom: '1px solid #eee'}}>
                            <div 
                                onClick={() => toggleRow(idx)}
                                style={{padding: '10px 15px', cursor: 'pointer', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
                            >
                                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                    {isOpen ? <ChevronDown size={14}/> : <ChevronRight size={14}/>}
                                    <span>{getRowTitle(row, idx)}</span>
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); removeRow(idx); }} className="jankx-btn-icon"><Trash2 size={14} /></button>
                            </div>
                            {isOpen && (
                                <div className="jankx-repeater-body" style={{background: '#f9f9f9'}}>
                                    {field.fields && field.fields.map((subField, subIdx) => (
                                        <ReduxFieldRenderer 
                                            key={subField.id + subIdx}
                                            field={subField}
                                            value={row[subField.id]}
                                            onChange={(val) => updateRowField(idx, subField.id, val)}
                                            allData={allData}
                                            onBatchUpdate={onBatchUpdate}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <div style={{padding: '10px', background: '#f6f7f7', textAlign: 'right'}}>
                <button onClick={addRow} className="jankx-btn jankx-btn-primary"><Plus size={14}/> <span>Add Row</span></button>
            </div>
        </div>
    );
};
