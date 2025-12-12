import React from 'react';
import { FieldProps } from '../types';

// Import all isolated fields
import { FieldInput, FieldTextarea, FieldDate, FieldMultiText } from './BasicFields';
import { FieldSelect, FieldSwitch, FieldCheckbox, FieldRadio, FieldButtonSet, FieldSlider } from './SelectionFields';
import { FieldColor, FieldTypography, FieldBackground, FieldSpacing, FieldDimensions } from './DesignFields';
import { FieldMedia, FieldGallery } from './MediaFields';
import { FieldRepeater, FieldSocialProfiles, FieldSortable } from './ExtensionFields';
import { FieldEditor, FieldAceEditor } from './EditorFields';
import { FieldSection, FieldDivide, FieldInfo, FieldRaw } from './LayoutFields';
import { FieldSeoComposite } from './SpecialFields';

// ==========================================
// MAIN RENDERER
// ==========================================

export const ReduxFieldRenderer: React.FC<FieldProps> = (props) => {
  const { field } = props;

  // Formatting Fields (Full Width)
  if (field.type === 'divide') return <FieldDivide {...props} />;
  if (field.type === 'section') return <FieldSection {...props} />;
  if (field.type === 'info') return <FieldInfo {...props} />;
  if (field.type === 'raw') return <FieldRaw {...props} />;

  // Special Full Width Fields
  if (field.type === 'repeater' || field.type === 'seo_composite') {
      return (
          <div className="jankx-field-row" style={{display: 'block'}}>
              <div style={{marginBottom: '10px'}}>
                  <span className="jankx-label-title">{field.title}</span>
                  {field.subtitle && <span className="jankx-label-desc">{field.subtitle}</span>}
              </div>
              {field.type === 'repeater' ? <FieldRepeater {...props} /> : <FieldSeoComposite {...props} />}
          </div>
      )
  }

  // Standard Row Layout
  return (
    <div className="jankx-field-row">
      <div className="jankx-label-col">
        <label className="jankx-label-title">{field.title}</label>
        {field.subtitle && <p className="jankx-label-desc">{field.subtitle}</p>}
      </div>
      <div className="jankx-input-col">
          {(() => {
            switch (field.type) {
              case 'text':
              case 'number':
              case 'password': return <FieldInput {...props} type={field.type} />;
              case 'date': return <FieldDate {...props} />;
              case 'textarea': return <FieldTextarea {...props} />;
              case 'multi_text': return <FieldMultiText {...props} />;
              case 'switch': return <FieldSwitch {...props} />;
              case 'select': return <FieldSelect {...props} />;
              case 'checkbox': return <FieldCheckbox {...props} />;
              case 'radio': return <FieldRadio {...props} />;
              case 'button_set': return <FieldButtonSet {...props} />;
              case 'slider': return <FieldSlider {...props} />;
              
              case 'color': return <FieldColor {...props} />;
              case 'typography': return <FieldTypography {...props} />;
              case 'background': return <FieldBackground {...props} />;
              case 'spacing': return <FieldSpacing {...props} />;
              case 'dimensions': return <FieldDimensions {...props} />;
              
              case 'media': return <FieldMedia {...props} />;
              case 'gallery': return <FieldGallery {...props} />;
              
              case 'social_profiles': return <FieldSocialProfiles {...props} />;
              case 'sortable': return <FieldSortable {...props} />;
              
              case 'editor': return <FieldEditor {...props} />;
              case 'ace_editor': return <FieldAceEditor {...props} />;

              default: return <div style={{color: 'red'}}>Field {field.type} not implemented</div>;
            }
          })()}
      </div>
    </div>
  );
};
