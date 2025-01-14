import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    TextField,
    Button,
    MenuItem,
    Typography,
    Box,
    List,
    ListItem,
    Collapse,
} from '@mui/material';
import {
    fetchOptionsRequest,
    saveOptionsRequest,
} from '../actions';
import '../assets/styles.scss';
import FrameworkInfo from './FrameworkInfo';
import Footer from './Footer';

class OptionFrameworkApp extends Component {
    constructor(props) {
        super(props);
        const fragment = decodeURI(window.location.hash.slice(1));
        const initialPage = fragment || Object.keys(props.optionsData)[0];

        this.state = {
            currentPage: initialPage,
            defaultPage: Object.keys(props.optionsData)[0],
            openSections: {},
            formData: props.formData
        };
    }

    componentDidMount() {
        this.props.fetchOptions();
        window.addEventListener('hashchange', this.handleHashChange);
    }

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.handleHashChange);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.formData !== this.props.formData) {
            this.setState({ formData: this.props.formData });
        }
    }

    handleChange = (fieldId, value) => {
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [fieldId]: value
            }
        }));
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.saveOptions(this.state.formData);
    };

    renderField = (fieldId, field) => {
        const value = this.state.formData[fieldId] || '';

        switch (field.type) {
            case 'input':
            case 'text':
                return (
                    <TextField
                        label={field.title}
                        value={value}
                        onChange={(e) => this.handleChange(fieldId, e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                );

            case 'textarea':
                return (
                    <TextField
                        label={field.title}
                        value={value}
                        onChange={(e) => this.handleChange(fieldId, e.target.value)}
                        multiline
                        rows={4}
                        fullWidth
                        margin="normal"
                    />
                );

            case 'select':
                return (
                    <TextField
                        select
                        label={field.title}
                        value={value}
                        onChange={(e) => this.handleChange(fieldId, e.target.value)}
                        fullWidth
                        margin="normal"
                    >
                        {Object.entries(field.args.options).map(([optionValue, optionLabel]) => (
                            <MenuItem key={optionValue} value={optionValue}>
                                {optionLabel}
                            </MenuItem>
                        ))}
                    </TextField>
                );

            case 'image':
                return (
                    <Box key={fieldId}>
                        <Typography variant="subtitle1">{field.title}</Typography>
                        <Box sx={{
                            mt: 1,
                            border: '1px dashed #ccc',
                            p: 2,
                            textAlign: 'center',
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: '#f5f5f5'
                            }
                        }}
                        onClick={() => this.openMediaLibrary(fieldId)}>
                            {value ? (
                                <Box>
                                    <img
                                        src={value}
                                        alt="Selected"
                                        style={{maxWidth: '200px', maxHeight: '200px'}}
                                    />
                                    <Button
                                        sx={{mt: 1}}
                                        variant="outlined"
                                        color="error"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            this.handleChange(fieldId, '');
                                        }}
                                    >
                                        Remove Image
                                    </Button>
                                </Box>
                            ) : (
                                <Typography>Click to select image</Typography>
                            )}
                        </Box>
                    </Box>
                );

            default:
                return null;
        }
    };

    handleToggleSection = (sectionId) => {
        this.setState(prevState => ({
            openSections: { ...prevState.openSections, [sectionId]: !prevState.openSections[sectionId] },
        }));
    };

    handlePageChange = (pageId) => {
        window.location.hash = pageId;
        this.setState({ currentPage: pageId });
    };

    handleHashChange = () => {
        const fragment = window.location.hash.slice(1);
        if (fragment && this.props.optionsData[fragment]) {
            this.setState({ currentPage: fragment });
        }
    };

    openMediaLibrary = (fieldId) => {
        // Create media frame if not exists
        if (!this.wp_media_frame) {
            this.wp_media_frame = window.wp.media({
                title: 'Select Image',
                button: {
                    text: 'Use this image'
                },
                multiple: false
            });

            // When image selected
            this.wp_media_frame.on('select', () => {
                const attachment = this.wp_media_frame.state().get('selection').first().toJSON();
                this.handleChange(this.current_field_id, attachment.url);
            });
        }

        this.current_field_id = fieldId;
        this.wp_media_frame.open();
    };

    render() {
        const { loading, error, optionsData } = this.props;
        const { currentPage, openSections, defaultPage } = this.state;

        let activePage = currentPage;

        if (loading) return <Typography>Loading...</Typography>;
        if (error) return <Typography color="error">{error}</Typography>;
        if (typeof optionsData[activePage] === 'undefined') {
            activePage = defaultPage;
        }

        return (
            <Box sx={{ display: 'flex', height: '100vh' }} component="form" onSubmit={this.handleSubmit}>
                {/* Sidebar Navigation */}
                <Box sx={{ width: '240px', padding: 2, backgroundColor: '#f0f0f0', position: 'fixed', height: '100vh' }}>
                    {window.frameworkConfig.logo ? (
                        <Box sx={{ mb: 2 }}>
                            <img src={window.frameworkConfig.logo} alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />
                        </Box>
                    ) : (
                        <Typography variant="h6">Navigation</Typography>
                    )}
                    <List>
                        {Object.entries(optionsData).map(([pageId, page]) => (
                            <ListItem
                                button="true"
                                key={pageId}
                                onClick={() => this.handlePageChange(pageId)}
                                selected={this.state.currentPage === pageId}
                                sx={{
                                    backgroundColor: this.state.currentPage === pageId ? 'rgba(0, 0, 0, 0.08)' : 'transparent'
                                }}
                            >
                                <Typography variant="body1">{page.title}</Typography>
                            </ListItem>
                        ))}
                    </List>
                </Box>

                {/* Main Content */}
                <Box sx={{ marginLeft: '240px', padding: 2, flexGrow: 1 }}>
                    <FrameworkInfo config={window.frameworkConfig} />
                    {Object.entries(optionsData[activePage].sections).map(([sectionId, section]) => (
                        <Box key={sectionId} sx={{ marginBottom: 3 }}>
                            <Typography variant="h6" onClick={() => this.handleToggleSection(sectionId)}>
                                {section.title}
                            </Typography>
                            <Box>
                                {section.fields.map((field) => (
                                    <Box key={field.id}>
                                        {this.renderField(field.id, field)}
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    ))}
                    <Button type="submit" variant="contained" color="primary" sx={{ mb: 4 }}>
                        Lưu
                    </Button>
                    <Footer config={window.frameworkConfig} />
                </Box>
            </Box>
        );
    }
}

const mapStateToProps = (state) => ({
    formData: state.formData,
    loading: state.loading,
    error: state.error,
});

const mapDispatchToProps = {
    fetchOptions: fetchOptionsRequest,
    saveOptions: saveOptionsRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionFrameworkApp);
