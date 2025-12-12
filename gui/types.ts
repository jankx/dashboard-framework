export interface SEOData extends Record<string, any> {
  focusKeyword?: string;
  seoTitle?: string;
  slug?: string;
  metaDescription?: string;
  contentSummary?: string;
}

export enum AnalysisStatus {
  GOOD = 'good',
  OK = 'ok',
  BAD = 'bad',
  NEUTRAL = 'neutral'
}

export interface AnalysisResult {
  score: AnalysisStatus;
  message: string;
}

export interface AIResponse {
  seoTitle: string;
  metaDescription: string;
}

// --- Redux Framework Types ---

export type FieldType = 
  // Basic
  | 'text' 
  | 'textarea' 
  | 'checkbox'
  | 'radio'
  | 'select' 
  | 'switch' 
  | 'button_set'
  | 'number'
  | 'password'
  | 'date'
  | 'multi_text'
  
  // Design & Media
  | 'color'
  | 'slider'
  | 'image' 
  | 'gallery' // Multiple images
  | 'media'   // Single file/image
  | 'background'
  | 'typography'
  | 'spacing'
  | 'dimensions'
  | 'border'
  | 'box_shadow'

  // Editors
  | 'editor'  // WYSIWYG
  | 'ace_editor' // Code
  
  // Layout/Presentation
  | 'section' // Sub-section header
  | 'divide'  // HR
  | 'info'    // Notice
  | 'raw'     // HTML
  
  // Extensions / Advanced
  | 'social_profiles'
  | 'sortable'
  | 'repeater'
  
  // Special
  | 'seo_composite';

export interface SocialProfileItem {
  id: string;
  enabled: boolean;
  url: string;
  label?: string; // Display name (e.g., "My TikTok")
  icon?: string;  // Icon name (e.g., "Video")
}

export interface OptionField {
  id: string; 
  type: FieldType;
  title?: string; // Optional for dividers/raw
  subtitle?: string;
  desc?: string; // Description below field
  placeholder?: string;
  options?: Record<string, string>; 
  default?: any;
  min?: number; 
  max?: number; 
  step?: number; 
  unit?: string;
  
  // Input Addons
  addon_before?: string;
  addon_after?: string;
  
  // For Raw field
  content?: string;
  
  // For Typography/Spacing etc
  units?: string[]; 
  
  // For Repeater (Recursive)
  fields?: OptionField[];
  group_values?: boolean; // If true, the group title uses the value of the first field
  add_button_text?: string;
}

export interface OptionSection {
  id: string;
  title: string;
  icon: any; 
  fields: OptionField[];
}

// Shared Props Interface
export interface FieldProps {
  field: OptionField;
  value: any;
  onChange: (value: any) => void;
  allData?: SEOData;
  onBatchUpdate?: (d: Partial<SEOData>) => void;
}
