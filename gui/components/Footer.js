import React from 'react';
import {
    Box,
    Stack,
    IconButton,
    Link,
    Text
} from '@chakra-ui/react';

const FacebookIcon = () => (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692V11.01h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.696h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
);
const TwitterIcon = () => (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.058 0 14.009-7.496 14.009-13.986 0-.21 0-.423-.016-.634A9.936 9.936 0 0 0 24 4.557z"/></svg>
);
const GitHubIcon = () => (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
);
const LinkedInIcon = () => (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M22.23 0H1.77C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.77 24h20.459C23.208 24 24 23.229 24 22.271V1.723C24 .771 23.208 0 22.23 0zM7.12 20.452H3.56V9h3.56v11.452zM5.34 7.633a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM20.452 20.452h-3.554v-5.569c0-1.328-.025-3.037-1.85-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554V9h3.414v1.561h.049c.476-.899 1.637-1.85 3.37-1.85 3.602 0 4.267 2.37 4.267 5.455v6.286z"/></svg>
);
const HelpIcon = () => (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.371 0 0 5.371 0 12c0 6.627 5.371 12 12 12s12-5.373 12-12c0-6.629-5.371-12-12-12zm1 19h-2v-2h2v2zm2.071-7.75l-.896.92C13.158 13.07 13 13.553 13 15h-2v-.5c0-.828.336-1.578.879-2.121l1.24-1.26c.373-.36.881-.859.881-1.739 0-1.104-.896-2-2-2s-2 .896-2 2H7c0-2.206 1.794-4 4-4s4 1.794 4 4c0 1.104-.447 1.789-1.929 3.25z"/></svg>
);
const BookIcon = () => (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 2H8c-1.104 0-2 .896-2 2v16c0 1.104.896 2 2 2h11c1.104 0 2-.896 2-2V4c0-1.104-.896-2-2-2zm0 18H8V4h11v16zm-9 0H5c-1.104 0-2-.896-2-2V4c0-1.104.896-2 2-2h2v18z"/></svg>
);

const Footer = ({ config }) => {
    const { social_links, support_url, documentation_url } = config;

    return (
        <Box
            borderTop="1px solid #ddd"
            mt={4}
            pt={2}
            pb={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
        >
            <Stack direction="row" spacing={1}>
                {social_links.facebook && (
                    <IconButton as="a" href={social_links.facebook} target="_blank">
                        <FacebookIcon />
                    </IconButton>
                )}
                {social_links.twitter && (
                    <IconButton as="a" href={social_links.twitter} target="_blank">
                        <TwitterIcon />
                    </IconButton>
                )}
                {social_links.github && (
                    <IconButton as="a" href={social_links.github} target="_blank">
                        <GitHubIcon />
                    </IconButton>
                )}
                {social_links.linkedin && (
                    <IconButton as="a" href={social_links.linkedin} target="_blank">
                        <LinkedInIcon />
                    </IconButton>
                )}
            </Stack>

            <Stack direction="row" spacing={2}>
                {support_url && (
                    <Link href={support_url} target="_blank" display="flex" alignItems="center">
                        <HelpIcon style={{ marginRight: 4 }} />
                        <Text>Support</Text>
                    </Link>
                )}
                {documentation_url && (
                    <Link href={documentation_url} target="_blank" display="flex" alignItems="center">
                        <BookIcon style={{ marginRight: 4 }} />
                        <Text>Documentation</Text>
                    </Link>
                )}
            </Stack>
        </Box>
    );
};

export default Footer;