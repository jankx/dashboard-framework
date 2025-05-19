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
} from '@chakra-ui/react';
import {
    fetchOptionsRequest,
    saveOptionsRequest,
} from '../actions';
import '../assets/styles.scss';
import FrameworkInfo from './FrameworkInfo';
import Footer from './Footer';
import FieldFactory from '../fields/FieldFactory';

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
        const fieldInstance = FieldFactory.create(fieldId, field, this.handleChange);
        return fieldInstance ? fieldInstance.render(this.state.formData) : null;
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

    render() {
        const { loading, error, optionsData } = this.props;
        const { currentPage, openSections, defaultPage } = this.state;

        let activePage = currentPage;

        if (loading) return <Typography>Loading...</Typography>;
        if (error) return <Typography color="red.500">{error}</Typography>;
        if (typeof optionsData[activePage] === 'undefined') {
            activePage = defaultPage;
        }

        return (
            <Box display="flex" height="100vh" as="form" onSubmit={this.handleSubmit}>
                {/* Sidebar Navigation */}
                <Box width="240px" p={2} bg="#f0f0f0" position="fixed" height="100vh">
                    {window.frameworkConfig.logo ? (
                        <Box mb={2}>
                            <img src={window.frameworkConfig.logo} alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />
                        </Box>
                    ) : (
                        <Typography fontSize="xl" fontWeight="bold">Navigation</Typography>
                    )}
                    <List>
                        {Object.entries(optionsData).map(([pageId, page]) => (
                            <ListItem
                                key={pageId}
                                onClick={() => this.handlePageChange(pageId)}
                                bg={this.state.currentPage === pageId ? 'rgba(0, 0, 0, 0.08)' : 'transparent'}
                                cursor="pointer"
                                fontWeight={this.state.currentPage === pageId ? 'bold' : 'normal'}
                            >
                                <Typography>{page.title}</Typography>
                            </ListItem>
                        ))}
                    </List>
                </Box>

                {/* Main Content */}
                <Box ml="240px" p={2} flexGrow={1}>
                    <FrameworkInfo config={window.frameworkConfig} />
                    {Object.entries(optionsData[activePage].sections).map(([sectionId, section]) => (
                        <Box key={sectionId} mb={3}>
                            <Typography fontSize="lg" fontWeight="semibold" onClick={() => this.handleToggleSection(sectionId)}>
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
                    <Button type="submit" colorScheme="blue" mb={4}>
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
