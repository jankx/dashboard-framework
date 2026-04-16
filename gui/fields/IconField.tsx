import React, { useState, useEffect, useRef } from 'react';
import { FieldProps } from '../types';
import { Search, X, ChevronDown, Check, Info } from 'lucide-react';

declare const jankxOptionAjax: {
    ajaxurl: string;
    nonce: string;
};

export const FieldIcon: React.FC<FieldProps> = ({ field, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [icons, setIcons] = useState<any[]>([]);
    const [types, setTypes] = useState<any>({});
    const [selectedType, setSelectedType] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [previewIcon, setPreviewIcon] = useState<any>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchTypes();
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen) {
            fetchIcons();
        }
    }, [isOpen, selectedType, searchTerm]);

    const fetchTypes = async () => {
        try {
            const response = await fetch(`${jankxOptionAjax.ajaxurl}?action=fetch_icons&nonce=${jankxOptionAjax.nonce}`);
            const result = await response.json();
            if (result.success) {
                setTypes(result.data.types);
                if (result.data.active_types && result.data.active_types.length > 0) {
                    setSelectedType(result.data.active_types[0]);
                }
            }
        } catch (e) {
            console.error('Failed to fetch icon types', e);
        }
    };

    const fetchIcons = async () => {
        setLoading(true);
        try {
            const url = new URL(jankxOptionAjax.ajaxurl);
            url.searchParams.append('action', 'fetch_icons');
            url.searchParams.append('nonce', jankxOptionAjax.nonce);
            if (selectedType) url.searchParams.append('type', selectedType);
            if (searchTerm) url.searchParams.append('search', searchTerm);

            const response = await fetch(url.toString());
            const result = await response.json();
            if (result.success) {
                setIcons(result.data);
            }
        } catch (e) {
            console.error('Failed to fetch icons', e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="jankx-icon-field" ref={dropdownRef} style={{ position: 'relative', maxWidth: '300px' }}>
            {/* Main Selector Box */}
            <div 
                className="jankx-icon-field__selector jankx-input"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: '#fff',
                    border: isOpen ? '2px solid #3b82f6' : '1px solid #d1d5db'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {value ? (
                        <>
                            <span style={{ fontSize: '20px', color: '#1e293b' }}><i className={value} /></span>
                            <span style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>{value.split(' ').pop()}</span>
                        </>
                    ) : (
                        <span style={{ color: '#94a3b8' }}>Select an icon...</span>
                    )}
                </div>
                <ChevronDown size={16} color="#64748b" />
            </div>

            {/* EXPANDED MODAL-LIKE PICKER */}
            {isOpen && (
                <div 
                    className="jankx-icon-picker-modal"
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '900px',
                        maxWidth: '95vw',
                        height: '600px',
                        maxHeight: '85vh',
                        background: '#fff',
                        borderRadius: '16px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        border: '1px solid #e2e8f0'
                    }}
                >
                    {/* Header */}
                    <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Select Icon</h3>
                            <span style={{ fontSize: '12px', background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '10px', fontWeight: '600' }}>Icon Repository</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
                    </div>

                    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                        {/* Sidebar: Icon Packs */}
                        <div style={{ width: '180px', borderRight: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ padding: '16px', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Icon Packs</div>
                            <div style={{ flex: 1, overflowY: 'auto' }}>
                                {Object.keys(types).map(type => (
                                    <div 
                                        key={type} 
                                        onClick={() => setSelectedType(type)}
                                        style={{
                                            padding: '10px 16px',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            color: selectedType === type ? '#3b82f6' : '#475569',
                                            background: selectedType === type ? '#eff6ff' : 'transparent',
                                            borderLeft: selectedType === type ? '4px solid #3b82f6' : '4px solid transparent',
                                            fontWeight: selectedType === type ? '600' : '400',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {types[type].display_name || type}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Main Body: Toolbar + Grid */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
                            {/* Toolbar */}
                            <div style={{ padding: '16px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: '12px' }}>
                                <div style={{ position: 'relative', flex: 1 }}>
                                    <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: '#94a3b8' }} />
                                    <input 
                                        type="text" 
                                        className="jankx-input" 
                                        placeholder="Search across all icons..." 
                                        style={{ paddingLeft: '40px', width: '100%', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                                <select className="jankx-input" style={{ width: '150px', borderRadius: '8px' }}>
                                    <option>All Categories</option>
                                </select>
                            </div>

                            {/* Grid Container */}
                            <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                                <div style={{ 
                                    display: 'grid', 
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', 
                                    gap: '16px' 
                                }}>
                                    {loading ? (
                                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#94a3b8' }}>Loading icons...</div>
                                    ) : (
                                        icons.map((icon, idx) => {
                                            const iconClass = icon.class || `${icon.prefix} ${icon.prefix}-${icon.name}`;
                                            const isSelected = value === iconClass;
                                            return (
                                                <div 
                                                    key={idx}
                                                    onClick={() => {
                                                        onChange(iconClass);
                                                        setPreviewIcon(icon);
                                                    }}
                                                    onDoubleClick={() => setIsOpen(false)}
                                                    style={{
                                                        border: isSelected ? '2px solid #3b82f6' : '1px solid #f1f5f9',
                                                        borderRadius: '12px',
                                                        padding: '16px 8px',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        gap: '12px',
                                                        cursor: 'pointer',
                                                        background: isSelected ? '#eff6ff' : '#fff',
                                                        boxShadow: isSelected ? '0 4px 6px -1px rgba(59, 130, 246, 0.1)' : 'none',
                                                        position: 'relative',
                                                        transition: 'transform 0.1s, background 0.1s'
                                                    }}
                                                    className="jankx-icon-item"
                                                >
                                                    {isSelected && (
                                                        <div style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#3b82f6', color: '#fff', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', border: '2px solid #fff', zIndex: 1 }}>
                                                            <Check size={14} strokeWidth={3} />
                                                        </div>
                                                    )}
                                                    <div style={{ fontSize: '32px', color: isSelected ? '#2563eb' : '#334155' }}>
                                                        <i className={iconClass} />
                                                    </div>
                                                    <div style={{ fontSize: '11px', color: '#64748b', textAlign: 'center', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                        {icon.name}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Panel: Preview & Settings */}
                        <div style={{ width: '240px', background: '#f8fafc', borderLeft: '1px solid #f1f5f9', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '16px' }}>Preview</div>
                            
                            {previewIcon || value ? (
                                <>
                                    <div style={{ background: '#fff', borderRadius: '12px', padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
                                        <div style={{ fontSize: '64px', color: '#0f172a' }}>
                                            <i className={previewIcon ? (previewIcon.class || `${previewIcon.prefix} ${previewIcon.prefix}-${previewIcon.name}`) : value} />
                                        </div>
                                    </div>
                                    
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        <div>
                                            <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', display: 'block', marginBottom: '4px' }}>Class Name</label>
                                            <code style={{ fontSize: '11px', background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', wordBreak: 'break-all', color: '#3b82f6' }}>
                                                {previewIcon ? (previewIcon.class || `${previewIcon.prefix} ${previewIcon.prefix}-${previewIcon.name}`) : value}
                                            </code>
                                        </div>
                                        <div style={{ borderTop: '1px solid #e2e8f0', pt: 4 }}>
                                            <button 
                                                className="jankx-btn jankx-btn-primary" 
                                                style={{ width: '100%', marginTop: '10px' }}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Insert Icon
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', textAlign: 'center' }}>
                                    <Info size={32} style={{ marginBottom: '12px', opacity: 0.5 }} />
                                    <p style={{ fontSize: '14px' }}>Select an icon to view details</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            
            {/* Backdrop */}
            {isOpen && (
                <div 
                    onClick={() => setIsOpen(false)}
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 9998 }}
                />
            )}
        </div>
    );
};

