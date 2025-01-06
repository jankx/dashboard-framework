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

class OptionFrameworkApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: Object.keys(props.optionsData)[0],
            openSections: {},
            formData: props.formData // Lưu trữ formData trong state
        };
    }

    componentDidMount() {
        this.props.fetchOptions(); // Fetch dữ liệu từ server
    }

    componentDidUpdate(prevProps) {
        // Cập nhật formData khi props.formData thay đổi
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

            default:
                return null;
        }
    };

    handleToggleSection = (sectionId) => {
        this.setState(prevState => ({
            openSections: { ...prevState.openSections, [sectionId]: !prevState.openSections[sectionId] },
        }));
    };

    render() {
        const { loading, error, optionsData } = this.props;
        const { currentPage, openSections } = this.state;

        if (loading) return <Typography>Loading...</Typography>;
        if (error) return <Typography color="error">{error}</Typography>;

        return (
            <Box sx={{ display: 'flex', height: '100vh' }} component="form" onSubmit={this.handleSubmit}>
                {/* Sidebar Navigation */}
                <Box sx={{ width: '240px', padding: 2, backgroundColor: '#f0f0f0', position: 'fixed', height: '100vh' }}>
                    <Typography variant="h6">Navigation</Typography>
                    <List>
                        {Object.entries(optionsData).map(([pageId, page]) => (
                            <ListItem button="true" key={pageId} onClick={() => this.setState({ currentPage: pageId })}>
                                <Typography variant="body1">{page.title}</Typography>
                            </ListItem>
                        ))}
                    </List>
                </Box>

                {/* Main Content */}
                <Box sx={{ marginLeft: '240px', padding: 2, flexGrow: 1 }}>
                    {Object.entries(optionsData[currentPage].sections).map(([sectionId, section]) => (
                        <Box key={sectionId} sx={{ marginBottom: 3 }}>
                            <Typography variant="h6" onClick={() => this.handleToggleSection(sectionId)}>
                                {section.title}
                            </Typography>
                            <Collapse in={openSections[sectionId]} timeout="auto" unmountOnExit>
                                {section.fields.map((field) => (
                                    <Box key={field.id}>
                                        {this.renderField(field.id, field)}
                                    </Box>
                                ))}
                            </Collapse>
                        </Box>
                    ))}
                    <Button type="submit" variant="contained" color="primary">
                        Lưu
                    </Button>
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
