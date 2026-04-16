import Field from './Field';
import { Box, Text, Radio, RadioGroup, Stack } from '@chakra-ui/react';

export default class RadioField extends Field {
    render(formData) {
        const value = this.getValue(formData);
        const options = this.field.options || {};

        return (
            <Box key={this.id} mb={6}>
                <Text fontWeight="600" mb={2}>{this.field.title}</Text>
                {this.field.description && (
                    <Text fontSize="sm" color="gray.500" mb={3}>{this.field.description}</Text>
                )}

                <RadioGroup 
                    colorScheme="blue" 
                    value={value || this.field.default}
                    onChange={(newValue) => this.onChange(this.id, newValue)}
                >
                    <Stack spacing={2} direction={this.field.layout === 'horizontal' ? 'row' : 'column'}>
                        {Object.entries(options).map(([val, label]) => (
                            <Radio key={val} value={val}>
                                {label}
                            </Radio>
                        ))}
                    </Stack>
                </RadioGroup>
            </Box>
        );
    }
}
