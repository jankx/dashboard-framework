import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Save, Menu } from 'lucide-react';
import {
    fetchOptionsRequest,
    saveOptionsRequest,
} from '../actions';
import '../assets/styles.scss';
import FrameworkInfo from './FrameworkInfo';
import Footer from './Footer';
import { ReduxFieldRenderer } from '../fields/ReduxFields';
import { OptionField } from '../types';

interface OptionFrameworkAppProps {
    optionsData: any;
    formData: any;
    loading: boolean;
    error: string | null;
    fetchOptions: () => void;
    saveOptions: (data: any) => void;
}

interface OptionFrameworkAppState {
    currentPage: string;
    defaultPage: string;
    openSections: Record<string, boolean>;
    formData: any;
    isMobileMenuOpen: boolean;
}

class OptionFrameworkApp extends Component<OptionFrameworkAppProps, OptionFrameworkAppState> {
    constructor(props: OptionFrameworkAppProps) {
        super(props);
        const fragment = decodeURI(window.location.hash.slice(1));
        const initialPage = fragment || Object.keys(props.optionsData || {})[0];

        this.state = {
            currentPage: initialPage,
            defaultPage: Object.keys(props.optionsData || {})[0],
            openSections: {},
            formData: props.formData || {},
            isMobileMenuOpen: false
        };
    }

    componentDidMount() {
        this.props.fetchOptions();
        window.addEventListener('hashchange', this.handleHashChange);
    }

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.handleHashChange);
    }

    componentDidUpdate(prevProps: OptionFrameworkAppProps) {
        if (prevProps.formData !== this.props.formData) {
            this.setState({ formData: this.props.formData || {} });
        }
    }

    handleChange = (fieldId: string, value: any) => {
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [fieldId]: value
            }
        }));
    };

    handleBatchUpdate = (updates: Partial<any>) => {
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                ...updates
            }
        }));
    };

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const dataToSave = this.state.formData || {};
        console.log('Saving options:', dataToSave);
        this.props.saveOptions(dataToSave);
    };

    handleToggleSection = (sectionId: string) => {
        this.setState(prevState => ({
            openSections: { ...prevState.openSections, [sectionId]: !prevState.openSections[sectionId] },
        }));
    };

    handlePageChange = (pageId: string) => {
        window.location.hash = pageId;
        this.setState({ currentPage: pageId, isMobileMenuOpen: false });
    };

    handleHashChange = () => {
        const fragment = window.location.hash.slice(1);
        if (fragment && this.props.optionsData && this.props.optionsData[fragment]) {
            this.setState({ currentPage: fragment });
        }
    };

    render() {
        const { loading, error, optionsData } = this.props;
        const { currentPage, openSections, defaultPage, formData, isMobileMenuOpen } = this.state;

        if (loading) return <div className="jankx-app"><div style={{padding: '40px', textAlign: 'center'}}>Loading...</div></div>;
        if (error) return <div className="jankx-app"><div style={{padding: '40px', color: 'red'}}>{error}</div></div>;
        if (!optionsData || Object.keys(optionsData).length === 0) {
            return <div className="jankx-app"><div style={{padding: '40px', textAlign: 'center'}}>No options data available</div></div>;
        }

        let activePage = currentPage;
        if (typeof optionsData[activePage] === 'undefined') {
            activePage = defaultPage;
        }

        const activePageData = optionsData[activePage];
        const config = (window as any).frameworkConfig || {};

        return (
            <div className="jankx-app">
                {/* --- HEADER --- */}
                <header className="jankx-header">
                    <div className="jankx-brand">
                        <button 
                            className="jankx-btn-icon" 
                            onClick={() => this.setState({ isMobileMenuOpen: !isMobileMenuOpen })} 
                            style={{display: 'none'}}
                        > 
                            <Menu />
                        </button>
                        {config.logo ? (
                            <img src={config.logo} alt="Logo" style={{maxHeight: '30px'}} />
                        ) : (
                            <>
                                <span className="jankx-logo-badge">J</span>
                                <span>Jankx <span style={{fontWeight: 400, color: '#aaa'}}>Options</span></span>
                            </>
                        )}
                    </div>
                    
                    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                        <button 
                            onClick={this.handleSubmit}
                            className="jankx-btn jankx-btn-primary"
                            type="button"
                        >
                            <Save size={16} />
                            <span>Save Changes</span>
                        </button>
                    </div>
                </header>

                {/* --- MAIN LAYOUT --- */}
                <div className="jankx-main-layout">
                    
                    {/* --- SIDEBAR --- */}
                    <aside className={`jankx-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
                        <div style={{padding: '20px 0'}}>
                            <p style={{padding: '0 20px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', opacity: 0.5, marginBottom: '10px'}}>Options Panel</p>
                            <nav>
                                {Object.entries(optionsData).map(([pageId, page]: [string, any]) => {
                                    const isActive = pageId === currentPage;
                                    return (
                                        <button
                                            key={pageId}
                                            onClick={() => this.handlePageChange(pageId)}
                                            className={`jankx-menu-item ${isActive ? 'active' : ''}`}
                                        >
                                            <span>{page.icon || ''}</span>
                                            <span>{page.title || pageId}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                        
                        <div style={{marginTop: 'auto', padding: '20px', borderTop: '1px solid #333'}}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.5, fontSize: '12px'}}>
                                <span>v{config.version || '1.0.0'}</span>
                            </div>
                        </div>
                    </aside>

                    {/* --- CONTENT AREA --- */}
                    <main className="jankx-content">
                        <div className="jankx-panel">
                            
                            {/* Section Header */}
                            <div className="jankx-panel-header">
                                {activePageData.icon && <span>{activePageData.icon}</span>}
                                <h2>{activePageData.title || activePage}</h2>
                            </div>

                            {/* Fields Container */}
                            <div className="jankx-panel-body">
                                {activePageData.sections && Object.entries(activePageData.sections).map(([sectionId, section]: [string, any]) => {
                                    const isOpen = openSections[sectionId] !== false;
                                    return (
                                        <div key={sectionId} style={{marginBottom: '20px'}}>
                                            <h3 
                                                style={{
                                                    marginTop: '30px',
                                                    marginBottom: '15px',
                                                    paddingBottom: '10px',
                                                    borderBottom: '1px solid #ddd',
                                                    cursor: 'pointer',
                                                    fontSize: '16px',
                                                    fontWeight: 600
                                                }}
                                                onClick={() => this.handleToggleSection(sectionId)}
                                            >
                                                {section.title || sectionId}
                                            </h3>
                                            {isOpen && section.fields && section.fields.map((field: OptionField, idx: number) => (
                                                <ReduxFieldRenderer 
                                                    key={field.id.toString() + idx} 
                                                    field={field}
                                                    value={formData[field.id] ?? field.default ?? null}
                                                    onChange={(val) => this.handleChange(field.id, val)}
                                                    allData={formData}
                                                    onBatchUpdate={this.handleBatchUpdate}
                                                />
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>
                            
                        </div>
                        <Footer config={config} />
                    </main>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    formData: state.formData,
    loading: state.loading,
    error: state.error,
});

const mapDispatchToProps = {
    fetchOptions: fetchOptionsRequest,
    saveOptions: saveOptionsRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionFrameworkApp);
