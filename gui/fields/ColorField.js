import Field from './Field';
import { Box, Text, Input, Flex } from '@chakra-ui/react';

export default class ColorField extends Field {
    render(formData) {
        const value = this.getValue(formData);
        const defaultValue = this.field.default || '#000000';

        return (
            <Box key={this.id} mb={6}>
                <Text fontWeight="600" mb={2}>{this.field.title}</Text>
                {this.field.description && (
                    <Text fontSize="sm" color="gray.500" mb={3}>{this.field.description}</Text>
                )}

                <Flex align="center">
                    <Box 
                        width="40px" 
                        height="40px" 
                        borderRadius="md" 
                        mr={3} 
                        border="1px solid" 
                        borderColor="gray.200"
                        bg={value || defaultValue}
                        sx={{
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <Input 
                            type="color" 
                            value={value || defaultValue}
                            onChange={(e) => this.onChange(this.id, e.target.value)}
                            position="absolute"
                            top="-5px"
                            left="-5px"
                            width="50px"
                            height="50px"
                            padding="0"
                            opacity="0"
                            cursor="pointer"
                        />
                    </Box>
                    <Input 
                        size="sm"
                        value={value}
                        placeholder={defaultValue}
                        onChange={(e) => this.onChange(this.id, e.target.value)}
                        width="120px"
                    />
                </Flex>
            </Box>
        );
    }
}
