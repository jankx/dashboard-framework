import React from 'react';
import {
    Box,
    Stack,
    IconButton,
    Link,
    Typography,
    Divider
} from '@mui/material';
import {
    Facebook,
    Twitter,
    GitHub,
    LinkedIn,
    Help,
    Book
} from '@mui/icons-material';

const Footer = ({ config }) => {
    const { social_links, support_url, documentation_url } = config;

    return (
        <Box sx={{
            borderTop: '1px solid #ddd',
            mt: 4,
            pt: 2,
            pb: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Stack direction="row" spacing={1}>
                {social_links.facebook && (
                    <IconButton component="a" href={social_links.facebook} target="_blank">
                        <Facebook />
                    </IconButton>
                )}
                {social_links.twitter && (
                    <IconButton component="a" href={social_links.twitter} target="_blank">
                        <Twitter />
                    </IconButton>
                )}
                {social_links.github && (
                    <IconButton component="a" href={social_links.github} target="_blank">
                        <GitHub />
                    </IconButton>
                )}
                {social_links.linkedin && (
                    <IconButton component="a" href={social_links.linkedin} target="_blank">
                        <LinkedIn />
                    </IconButton>
                )}
            </Stack>

            <Stack direction="row" spacing={2}>
                {support_url && (
                    <Link href={support_url} target="_blank" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Help sx={{ mr: 0.5 }} />
                        <Typography>Support</Typography>
                    </Link>
                )}
                {documentation_url && (
                    <Link href={documentation_url} target="_blank" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Book sx={{ mr: 0.5 }} />
                        <Typography>Documentation</Typography>
                    </Link>
                )}
            </Stack>
        </Box>
    );
};

export default Footer;