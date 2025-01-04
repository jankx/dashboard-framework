import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Typography, Box } from '@mui/material';

const OptionFrameworkApp = ({ optionsData, instanceName }) => {
    const [formData, setFormData] = useState({});

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

            // Add more field types as needed

            default:
                return null;
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
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
    );
};

export default OptionFrameworkApp;
