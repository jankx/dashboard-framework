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
    const {
        logo,
        version,
        description,
        social_links,
        support_url,
        documentation_url
    } = config;

    return (
        <Box sx={{ padding: 3, backgroundColor: '#f8f9fa', marginBottom: 3 }}>
            {logo && (
                <Box sx={{ marginBottom: 2 }}>
                    <img src={logo} alt="Framework Logo" style={{ maxHeight: 50 }} />
                </Box>
            )}

            <Typography variant="h5" gutterBottom>
                Version: {version}
            </Typography>

            {description && (
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    {description}
                </Typography>
            )}

            <Stack direction="row" spacing={2} sx={{ marginY: 2 }}>
                {social_links.facebook && (
                    <IconButton component={Link} href={social_links.facebook} target="_blank">
                        <Facebook />
                    </IconButton>
                )}
                {social_links.twitter && (
                    <IconButton component={Link} href={social_links.twitter} target="_blank">
                        <Twitter />
                    </IconButton>
                )}
                {social_links.github && (
                    <IconButton component={Link} href={social_links.github} target="_blank">
                        <GitHub />
                    </IconButton>
                )}
                {social_links.linkedin && (
                    <IconButton component={Link} href={social_links.linkedin} target="_blank">
                        <LinkedIn />
                    </IconButton>
                )}
            </Stack>

            <Divider sx={{ marginY: 2 }} />

            <Stack direction="row" spacing={2}>
                {support_url && (
                    <Link href={support_url} target="_blank">
                        Support
                    </Link>
                )}
                {documentation_url && (
                    <Link href={documentation_url} target="_blank">
                        Documentation
                    </Link>
                )}
            </Stack>
        </Box>
    );
};

export default FrameworkInfo;