import React from 'react';
import {
    Box,
    Typography,
    Link,
    Stack,
    IconButton,
    Divider
} from '@mui/material';
import {
    Facebook,
    Twitter,
    GitHub,
    LinkedIn
} from '@mui/icons-material';

const FrameworkInfo = ({ config }) => {
    const { logo, version, description } = config;

    return (
        <Box sx={{ mb: 4 }}>
            {version && (
                <Typography variant="subtitle2" color="textSecondary">
                    Version {version}
                </Typography>
            )}
            {description && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                    {description}
                </Typography>
            )}
        </Box>
    );
};

export default FrameworkInfo;