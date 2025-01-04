import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    MenuItem,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    Collapse,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const OptionFrameworkApp = ({ optionsData, instanceName }) => {
    const [formData, setFormData] = useState({});
    const [openSections, setOpenSections] = useState({});

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem(instanceName)) || {};
        setFormData(savedData);
    }, [instanceName]);

    const handleChange = (fieldId, value) => {
        setFormData(prevData => ({ ...prevData, [fieldId]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem(instanceName, JSON.stringify(formData));
        // Có thể gửi dữ liệu đến server nếu cần
    };

    const renderField = (fieldId, field) => {
        const value = formData[fieldId] || '';

        switch (field.type) {
            case 'input':
                return (
                    <TextField
                        label={field.title}
                        value={value}
                        onChange={(e) => handleChange(fieldId, e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                );

            case 'textarea':
                return (
                    <TextField
                        label={field.title}
                        value={value}
                        onChange={(e) => handleChange(fieldId, e.target.value)}
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
                        onChange={(e) => handleChange(fieldId, e.target.value)}
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

    const handleToggleSection = (sectionId) => {
        setOpenSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar */}
            <Box sx={{ width: '20%', padding: 2, backgroundColor: '#f0f0f0' }}>
                <Typography variant="h6">Navigation</Typography>
                <List>
                    {Object.entries(optionsData).map(([sectionId, section]) => (
                        <div key={sectionId}>
                            <ListItem button onClick={() => handleToggleSection(sectionId)}>
                                <ListItemText primary={section.title} />
                                {openSections[sectionId] ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openSections[sectionId]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {section.fields.map((field) => (
                                        <ListItem key={field.id} sx={{ pl: 4 }}>
                                            <ListItemText primary={field.title} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        </div>
                    ))}
                </List>
            </Box>

            {/* Nội dung chính */}
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '80%', padding: 2 }}>
                {Object.entries(optionsData).map(([sectionId, section]) => (
                    <Box key={sectionId} sx={{ marginBottom: 3 }}>
                        <Typography variant="h6">{section.title}</Typography>
                        {Object.entries(section.fields).map(([fieldId, field]) => (
                            <Box key={fieldId}>
                                {renderField(fieldId, field)}
                            </Box>
                        ))}
                    </Box>
                ))}
                <Button type="submit" variant="contained" color="primary">
                    Lưu
                </Button>
            </Box>
        </Box>
    );
};

export default OptionFrameworkApp;
