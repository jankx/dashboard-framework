import React from 'react';
import { FieldProps } from '../types';

export const FieldSwitch: React.FC<FieldProps> = ({ value, onChange }) => (
  <button onClick={() => onChange(!value)} className={`jankx-switch ${value ? 'active' : ''}`} type="button">
    <span className="jankx-switch-handle" />
  </button>
);

export const FieldSelect: React.FC<FieldProps> = ({ field, value, onChange }) => (
  <select value={value || ''} onChange={(e) => onChange(e.target.value)} className="jankx-input" style={{maxWidth: '300px'}}>
    <option value="">Select option...</option>
    {field.options && Object.entries(field.options).map(([key, label]) => (
        <option key={key} value={key}>{label}</option>
    ))}
  </select>
);

export const FieldCheckbox: React.FC<FieldProps> = ({ field, value, onChange }) => {
  const currentValues = Array.isArray(value) ? value : [];
  const handleToggle = (key: string) => {
    if (currentValues.includes(key)) onChange(currentValues.filter((v: string) => v !== key));
    else onChange([...currentValues, key]);
  };
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
      {field.options && Object.entries(field.options).map(([key, label]) => (
        <label key={key} style={{display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px'}}>
          <input type="checkbox" checked={currentValues.includes(key)} onChange={() => handleToggle(key)} />
          <span>{label}</span>
        </label>
      ))}
    </div>
  );
};

export const FieldRadio: React.FC<FieldProps> = ({ field, value, onChange }) => (
  <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
    {field.options && Object.entries(field.options).map(([key, label]) => (
      <label key={key} style={{display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px'}}>
        <input type="radio" name={field.id} checked={value === key} onChange={() => onChange(key)} />
        <span>{label}</span>
      </label>
    ))}
  </div>
);

export const FieldButtonSet: React.FC<FieldProps> = ({ field, value, onChange }) => (
  <div style={{display: 'inline-flex', borderRadius: '4px', overflow: 'hidden', border: '1px solid #8c8f94'}}>
    {field.options && Object.entries(field.options).map(([key, label]) => {
      const isSelected = value === key;
      return (
        <button
          key={key}
          onClick={() => onChange(key)}
          style={{
              padding: '8px 16px',
              background: isSelected ? 'var(--jankx-primary)' : 'white',
              color: isSelected ? 'white' : '#3c434a',
              border: 'none',
              borderRight: '1px solid #8c8f94',
              cursor: 'pointer',
              fontSize: '13px',
              height: '34px'
          }}
        >
          {label}
        </button>
      )
    })}
  </div>
);

export const FieldSlider: React.FC<FieldProps> = ({ field, value, onChange }) => {
    const min = field.min ?? 0;
    const max = field.max ?? 100;
    const step = field.step ?? 1;
    
    return (
        <div style={{display: 'flex', alignItems: 'center', gap: '15px', maxWidth: '500px'}}>
            <input 
                type="range" 
                min={min} 
                max={max} 
                step={step} 
                value={value ?? min} 
                onChange={e => onChange(Number(e.target.value))}
                style={{flex: 1, accentColor: 'var(--jankx-primary)'}}
            />
            <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                <input 
                    type="number" 
                    className="jankx-input" 
                    value={value ?? min} 
                    onChange={e => onChange(Number(e.target.value))} 
                    style={{width: '70px'}}
                />
                <span style={{fontSize: '12px', color: '#888'}}>{field.unit}</span>
            </div>
        </div>
    );
};
