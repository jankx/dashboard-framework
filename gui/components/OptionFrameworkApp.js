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
import axios from 'axios';

const OptionFrameworkApp = ({ optionsData, instanceName }) => {
    const [formData, setFormData] = useState({});
    const [openSections, setOpenSections] = useState({});
    const [currentPage, setCurrentPage] = useState('general_settings'); // Mặc định là page đầu tiên
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await axios.get('/wp-admin/admin-ajax.php', {
                    params: {
                        action: 'fetch_options', // Gọi action để lấy dữ liệu
                    },
                });
                if (response.data.success) {
                    setFormData(response.data.data || {}); // Cập nhật formData với dữ liệu đã lấy
                } else {
                    setError('Không thể lấy dữ liệu cài đặt');
                }
            } catch (err) {
                setError('Lỗi khi lấy dữ liệu cài đặt');
            } finally {
                setLoading(false);
            }
        };

        fetchOptions();
    }, []);

    const handleChange = (fieldId, value) => {
        setFormData(prevData => ({ ...prevData, [fieldId]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData) {
            setError('Dữ liệu biểu mẫu không được xác định');
            return;
        }
        try {

            // Gửi formData dưới dạng JSON trong phần thân của yêu cầu
            await axios.post('/wp-admin/admin-ajax.php?action=save_options', {
                headers: {
                    'Content-Type': 'application/json' // Đặt tiêu đề Content-Type
                },
                data: JSON.stringify(formData) // Gửi formData dưới dạng JSON
            });

            alert('Cài đặt đã được lưu thành công!');
        } catch (err) {
            setError('Lỗi khi lưu cài đặt');
        }
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
                    {Object.entries(optionsData).map(([pageId, page]) => (
                        <ListItem button key={pageId} onClick={() => setCurrentPage(pageId)}>
                            <ListItemText primary={page.title} />
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Nội dung chính */}
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '80%', padding: 2 }}>
                {Object.entries(optionsData[currentPage].sections).map(([sectionId, section]) => (
                    <Box key={sectionId} sx={{ marginBottom: 3 }}>
                        <Typography variant="h6">{section.title}</Typography>
                        {section.fields.map((field) => (
                            <Box key={field.id}>
                                {renderField(field.id, field)}
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
