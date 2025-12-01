import React from 'react';
import { FieldProps } from '../types';
import { Loader2, Wand2 } from 'lucide-react';

// Placeholder components - can be extended later
export const FieldSeoComposite: React.FC<FieldProps> = ({ allData, onBatchUpdate }) => {
    const [isGenerating, setIsGenerating] = React.useState(false);
    if (!allData || !onBatchUpdate) return null;

    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            // Placeholder for AI generation
            // const result = await generateSEOTags(allData.focusKeyword || '', allData.contentSummary || '');
            // onBatchUpdate(result);
        } catch (error) { alert("Generation failed."); } 
        finally { setIsGenerating(false); }
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <div>
                <label className="jankx-label-title">SEO Title</label>
                <input type="text" className="jankx-input" value={allData.seoTitle || ''} onChange={(e) => onBatchUpdate({ seoTitle: e.target.value })} />
            </div>
            <div>
                <label className="jankx-label-title">Meta Description</label>
                <textarea className="jankx-input" rows={3} value={allData.metaDescription || ''} onChange={(e) => onBatchUpdate({ metaDescription: e.target.value })} />
            </div>
            <div style={{textAlign: 'right'}}>
                <button onClick={handleGenerate} disabled={isGenerating} className="jankx-btn jankx-btn-primary">
                    {isGenerating ? <Loader2 className="animate-spin" size={16} /> : <Wand2 size={16} />}
                    <span>Generate AI</span>
                </button>
            </div>
        </div>
    );
};
