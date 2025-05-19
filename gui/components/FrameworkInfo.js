import React from 'react';
import { Text, Box } from '@chakra-ui/react';

const FrameworkInfo = ({ config }) => {
    const { logo, version, description } = config;

    return (
        <Box mb={4}>
            {version && (
                <Text fontSize="sm" color="gray.500">
                    Version {version}
                </Text>
            )}
            {description && (
                <Text fontSize="md" mt={1}>
                    {description}
                </Text>
            )}
        </Box>
    );
};

export default FrameworkInfo;