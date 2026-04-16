import React from 'react';
import { FieldProps } from '../types';

export const FieldDivide: React.FC = () => <hr style={{margin: '20px 0', border: '0', borderTop: '1px solid #eee'}} />;

export const FieldSection: React.FC<FieldProps> = ({ field }) => <h3 style={{marginTop: '30px', borderBottom: '1px solid #ddd', paddingBottom: '10px'}}>{field.title}</h3>;

export const FieldInfo: React.FC<FieldProps> = ({ field }) => <div style={{padding: '10px', background: '#e5f5fa', borderLeft: '4px solid #00a0d2', marginBottom: '20px'}}>{field.default}</div>;

export const FieldRaw: React.FC<FieldProps> = ({ field }) => <div style={{marginBottom: '20px'}} dangerouslySetInnerHTML={{ __html: field.content || '' }} />;
