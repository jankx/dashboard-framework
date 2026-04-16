import React from 'react';
import ImageField from './ImageField';
import { Box, Text, Button, Flex, Image, IconButton, SimpleGrid } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

export default class MediaField extends ImageField {
    openMediaLibrary() {
        if (!window.wp || !window.wp.media) {
            console.error('WordPress Media Library is not available.');
            return;
        }

        const isMultiple = this.field.multiple || false;

        if (!this.wp_media_frame) {
            this.wp_media_frame = window.wp.media({
                title: this.field.title || 'Select Media',
                button: {
                    text: 'Select'
                },
                multiple: isMultiple,
                library: {
                    type: this.field.library || 'all'
                }
            });

            this.wp_media_frame.on('select', () => {
                if (isMultiple) {
                    const attachments = this.wp_media_frame.state().get('selection').map(a => a.toJSON());
                    const values = attachments.map(attachment => ({
                        id: attachment.id,
                        url: attachment.url,
                        thumbnail: attachment.sizes && attachment.sizes.thumbnail ? attachment.sizes.thumbnail.url : attachment.url,
                        title: attachment.title
                    }));
                    this.onChange(this.id, values);
                } else {
                    const attachment = this.wp_media_frame.state().get('selection').first().toJSON();
                    this.onChange(this.id, {
                        id: attachment.id,
                        url: attachment.url,
                        thumbnail: attachment.sizes && attachment.sizes.thumbnail ? attachment.sizes.thumbnail.url : attachment.url,
                        title: attachment.title
                    });
                }
            });
        }

        this.wp_media_frame.open();
    }

    render(formData) {
        const value = this.getValue(formData);
        const isMultiple = this.field.multiple || false;

        if (!isMultiple) {
            return super.render(formData);
        }

        const values = Array.isArray(value) ? value : [];

        return (
            <Box key={this.id} mb={6}>
                <Text fontWeight="600" mb={2}>{this.field.title}</Text>
                {this.field.description && (
                    <Text fontSize="sm" color="gray.500" mb={3}>{this.field.description}</Text>
                )}
                
                <SimpleGrid columns={[2, 3, 5]} spacing={4} mb={4}>
                    {values.map((item, index) => (
                        <Box key={index} position="relative" borderRadius="md" overflow="hidden" boxShadow="sm" border="1px solid" borderColor="gray.200" height="120px">
                             <Image
                                src={item.thumbnail || item.url}
                                alt="Selected"
                                width="100%"
                                height="100%"
                                objectFit="cover"
                                bg="gray.50"
                            />
                            <IconButton
                                icon={<CloseIcon />}
                                size="xs"
                                position="absolute"
                                top={1}
                                right={1}
                                colorScheme="red"
                                onClick={() => {
                                    const newValues = [...values];
                                    newValues.splice(index, 1);
                                    this.onChange(this.id, newValues);
                                }}
                                aria-label="Remove item"
                            />
                        </Box>
                    ))}
                </SimpleGrid>

                <Button 
                    variant="outline" 
                    colorScheme="blue" 
                    onClick={() => this.openMediaLibrary()}
                    leftIcon={<span className="dashicons dashicons-admin-media" style={{fontSize: '18px', width: '18px', height: '18px'}}></span>}
                >
                    {__('Add Media', 'jankx')}
                </Button>
            </Box>
        );
    }
}
