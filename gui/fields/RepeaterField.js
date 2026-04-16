import React from 'react';
import Field from './Field';
import { Box, Text, Button, Flex, IconButton, VStack, Divider } from '@chakra-ui/react';
import { AddIcon, DeleteIcon, ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
// Note: We'll need access to the FieldFactory to create subfields
import FieldFactory from './FieldFactory';

export default class RepeaterField extends Field {
    constructor(id, field, onChange) {
        super(id, field, onChange);
        this.subFields = field.fields || [];
    }

    render(formData) {
        const rows = this.getValue(formData) || [];
        const isArray = Array.isArray(rows);
        const dataRows = isArray ? rows : [];

        const handleAddRow = () => {
            const newRow = {};
            this.subFields.forEach(subField => {
                newRow[subField.id] = subField.default || '';
            });
            this.onChange(this.id, [...dataRows, newRow]);
        };

        const handleRemoveRow = (index) => {
            const newRows = [...dataRows];
            newRows.splice(index, 1);
            this.onChange(this.id, newRows);
        };

        const handleFieldChange = (rowIndex, subFieldId, value) => {
            const newRows = [...dataRows];
            newRows[rowIndex] = {
                ...newRows[rowIndex],
                [subFieldId]: value
            };
            this.onChange(this.id, newRows);
        };

        return (
            <Box key={this.id} mb={6} p={4} border="1px solid" borderColor="gray.200" borderRadius="md" bg="gray.50">
                <Text fontWeight="600" mb={2} fontSize="lg">{this.field.title}</Text>
                {this.field.description && (
                    <Text fontSize="sm" color="gray.500" mb={4}>{this.field.description}</Text>
                )}

                <VStack spacing={4} align="stretch" mb={4}>
                    {dataRows.map((row, index) => (
                        <Box key={index} p={4} bg="white" boxShadow="sm" borderRadius="md" position="relative" borderLeft="4px solid" borderColor="blue.400">
                            <Flex justify="space-between" align="center" mb={4}>
                                <Text fontWeight="bold" fontSize="sm">Item #{index + 1}</Text>
                                <IconButton
                                    icon={<DeleteIcon />}
                                    size="xs"
                                    colorScheme="red"
                                    variant="ghost"
                                    onClick={() => handleRemoveRow(index)}
                                    aria-label="Remove item"
                                />
                            </Flex>
                            
                            {this.subFields.map(subField => {
                                const subFieldId = subField.id;
                                // Create a surrogate onChange that updates only this row
                                const subOnChange = (id, value) => handleFieldChange(index, id, value);
                                
                                const fieldInstance = FieldFactory.create(subFieldId, subField, subOnChange);
                                if (!fieldInstance) return null;
                                
                                return fieldInstance.render(row);
                            })}
                        </Box>
                    ))}
                </VStack>

                <Button 
                    leftIcon={<AddIcon />} 
                    colorScheme="blue" 
                    size="sm" 
                    onClick={handleAddRow}
                >
                    {__('Add New Item', 'jankx')}
                </Button>
            </Box>
        );
    }
}
