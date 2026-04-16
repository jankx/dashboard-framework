import Field from './Field';
import { Box, Text, Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';

export default class CheckboxField extends Field {
    render(formData) {
        const value = this.getValue(formData);
        const options = this.field.options || null;

        return (
            <Box key={this.id} mb={6}>
                <Text fontWeight="600" mb={2}>{this.field.title}</Text>
                {this.field.description && (
                    <Text fontSize="sm" color="gray.500" mb={3}>{this.field.description}</Text>
                )}

                {options ? (
                    <CheckboxGroup 
                        colorScheme="blue" 
                        value={Array.isArray(value) ? value : []}
                        onChange={(newValues) => this.onChange(this.id, newValues)}
                    >
                        <Stack spacing={2} direction={this.field.layout === 'horizontal' ? 'row' : 'column'}>
                            {Object.entries(options).map(([val, label]) => (
                                <Checkbox key={val} value={val}>
                                    {label}
                                </Checkbox>
                            ))}
                        </Stack>
                    </CheckboxGroup>
                ) : (
                    <Checkbox 
                        colorScheme="blue" 
                        isChecked={!!value} 
                        onChange={(e) => this.onChange(this.id, e.target.checked)}
                    >
                        {this.field.label || __('Enable', 'jankx')}
                    </Checkbox>
                )}
            </Box>
        );
    }
}
