import Field from './Field';
import { Box, Text, Button, Image, Flex, IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

export default class ImageField extends Field {
    openMediaLibrary() {
        if (!window.wp || !window.wp.media) {
            console.error('WordPress Media Library is not available.');
            return;
        }

        if (!this.wp_media_frame) {
            this.wp_media_frame = window.wp.media({
                title: this.field.title || 'Select Image',
                button: {
                    text: 'Select'
                },
                multiple: false,
                library: {
                    type: this.field.library || 'image'
                }
            });

            this.wp_media_frame.on('select', () => {
                const attachment = this.wp_media_frame.state().get('selection').first().toJSON();
                // Store ID and URL for better WP compatibility
                this.onChange(this.id, {
                    id: attachment.id,
                    url: attachment.url,
                    thumbnail: attachment.sizes && attachment.sizes.thumbnail ? attachment.sizes.thumbnail.url : attachment.url
                });
            });
        }

        this.wp_media_frame.open();
    }

    render(formData) {
        const value = this.getValue(formData);
        const imageUrl = typeof value === 'object' ? value.url : value;

        return (
            <Box key={this.id} mb={6}>
                <Text fontWeight="600" mb={2}>{this.field.title}</Text>
                {this.field.description && (
                    <Text fontSize="sm" color="gray.500" mb={3}>{this.field.description}</Text>
                )}
                
                <Flex direction="column" align="start">
                    {imageUrl ? (
                        <Box position="relative" borderRadius="md" overflow="hidden" boxShadow="sm" border="1px solid" borderColor="gray.200">
                            <Image
                                src={imageUrl}
                                alt="Selected"
                                maxH="200px"
                                objectFit="contain"
                                bg="gray.50"
                            />
                            <IconButton
                                icon={<CloseIcon />}
                                size="xs"
                                position="absolute"
                                top={1}
                                right={1}
                                colorScheme="red"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    this.onChange(this.id, '');
                                }}
                                aria-label="Remove image"
                            />
                        </Box>
                    ) : (
                        <Button 
                            variant="outline" 
                            colorScheme="blue" 
                            onClick={() => this.openMediaLibrary()}
                            leftIcon={<span className="dashicons dashicons-format-image" style={{fontSize: '18px', width: '18px', height: '18px'}}></span>}
                        >
                            {__('Choose Image', 'jankx')}
                        </Button>
                    )}
                </Flex>
            </Box>
        );
    }
}