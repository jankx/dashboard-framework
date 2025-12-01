import React, { useRef, useEffect } from 'react';
import { FieldProps } from '../types';
import { Eye, EyeOff, Calendar, Trash2, Plus } from 'lucide-react';

// Inline Locale for Datepicker
const localeEn = {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    today: 'Today',
    clear: 'Clear',
    dateFormat: 'yyyy-MM-dd',
    timeFormat: 'hh:mm aa',
    firstDay: 0
};

export const FieldInput: React.FC<FieldProps & { type: 'text' | 'number' | 'password' }> = ({ field, value, onChange, type }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const inputType = type === 'password' && showPassword ? 'text' : type;

  const wrapperStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'stretch',
      position: 'relative',
      maxWidth: '500px'
  };

  const addonStyle: React.CSSProperties = {
      padding: '0 12px',
      background: '#f0f0f1',
      border: '1px solid #8c8f94',
      fontSize: '14px',
      color: '#646970',
      display: 'flex',
      alignItems: 'center',
      height: '36px',
      lineHeight: '34px'
  };

  return (
    <div style={wrapperStyle}>
      {/* Addon Before */}
      {field.addon_before && (
        <span style={{...addonStyle, borderRight: 'none', borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px'}}>
          {field.addon_before}
        </span>
      )}

      <div style={{flex: 1, position: 'relative'}}>
        <input
          type={inputType}
          value={value || ''}
          onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
          placeholder={field.placeholder}
          min={field.min}
          max={field.max}
          step={field.step}
          className="jankx-input"
          style={{
              borderRadius: field.addon_before || field.addon_after ? '0' : '4px',
              borderTopLeftRadius: field.addon_before ? '0' : '4px',
              borderBottomLeftRadius: field.addon_before ? '0' : '4px',
              borderTopRightRadius: field.addon_after ? '0' : '4px',
              borderBottomRightRadius: field.addon_after ? '0' : '4px',
          }}
        />
        {type === 'password' && (
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#999'}}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>

      {/* Addon After */}
      {field.addon_after && (
        <span style={{...addonStyle, borderLeft: 'none', borderTopRightRadius: '4px', borderBottomRightRadius: '4px'}}>
          {field.addon_after}
        </span>
      )}
    </div>
  );
};

export const FieldDate: React.FC<FieldProps> = ({ field, value, onChange }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const dpInstance = useRef<any>(null);

    useEffect(() => {
        const loadLib = async () => {
            try {
                // @ts-ignore
                const mod = await import('air-datepicker');
                const AD = (mod.default || mod) as any;
                if (inputRef.current && AD) {
                     dpInstance.current = new AD(inputRef.current, {
                        locale: localeEn,
                        selectedDates: value ? [value] : [],
                        autoClose: true,
                        onSelect: ({ formattedDate }: any) => {
                            const val = Array.isArray(formattedDate) ? formattedDate[0] : formattedDate;
                            onChange(val);
                        }
                    });
                }
            } catch (e) { console.warn(e); }
        };
        loadLib();
    }, []);

    return (
        <div style={{position: 'relative', maxWidth: '200px'}}>
            <input ref={inputRef} type="text" defaultValue={value || ''} placeholder={field.placeholder || 'YYYY-MM-DD'} className="jankx-input" />
            <div style={{position: 'absolute', right: '10px', top: '8px', pointerEvents: 'none', color: '#999'}}>
                <Calendar size={16} />
            </div>
        </div>
    );
};

export const FieldTextarea: React.FC<FieldProps> = ({ field, value, onChange }) => (
  <textarea
    value={value || ''}
    onChange={(e) => onChange(e.target.value)}
    placeholder={field.placeholder}
    rows={4}
    className="jankx-input"
    style={{maxWidth: '500px'}}
  />
);

export const FieldMultiText: React.FC<FieldProps> = ({ field, value, onChange }) => {
    const lines: string[] = Array.isArray(value) ? value : [''];
    const handleChange = (idx: number, val: string) => {
        const newLines = [...lines];
        newLines[idx] = val;
        onChange(newLines);
    };
    const handleAdd = () => onChange([...lines, '']);
    const handleRemove = (idx: number) => onChange(lines.filter((_, i) => i !== idx));

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '500px'}}>
            {lines.map((line, idx) => (
                <div key={idx} style={{display: 'flex', gap: '5px'}}>
                    <input type="text" value={line} onChange={(e) => handleChange(idx, e.target.value)} className="jankx-input" />
                    <button onClick={() => handleRemove(idx)} className="jankx-btn-icon" style={{color: '#dc3232'}}><Trash2 size={16} /></button>
                </div>
            ))}
            <button onClick={handleAdd} className="jankx-btn" style={{alignSelf: 'flex-start', border: 'none', background: 'none', color: 'var(--jankx-primary)', paddingLeft: 0}}>
                <Plus size={14} /> <span>Add More</span>
            </button>
        </div>
    );
};
