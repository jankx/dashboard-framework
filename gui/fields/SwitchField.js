import Field from './Field';
import { Box, Text, FormControl, FormLabel, Switch, Flex } from '@chakra-ui/react';

export default class SwitchField extends Field {
    render(formData) {
        const value = this.getValue(formData);

        return (
            <Box key={this.id} mb={6}>
                 <FormControl display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                        <FormLabel htmlFor={this.id} mb="0" fontWeight="600">
                            {this.field.title}
                        </FormLabel>
                        {this.field.description && (
                            <Text fontSize="sm" color="gray.500">{this.field.description}</Text>
                        )}
                    </Box>
                    <Flex align="center">
                        <Text fontSize="xs" mr={2} color="gray.400">{this.field.off || 'Off'}</Text>
                        <Switch 
                            id={this.id} 
                            colorScheme="blue" 
                            isChecked={!!value}
                            onChange={(e) => this.onChange(this.id, e.target.checked)}
                        />
                        <Text fontSize="xs" ml={2} color="gray.400">{this.field.on || 'On'}</Text>
                    </Flex>
                </FormControl>
            </Box>
        );
    }
}
