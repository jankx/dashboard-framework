import Field from './Field';
import { Box, Typography, Button } from '@mui/material';

export default class ImageField extends Field {
    openMediaLibrary() {
        if (!this.wp_media_frame) {
            this.wp_media_frame = window.wp.media({
                title: 'Select Image',
                button: {
                    text: 'Use this image'
                },
                multiple: false
            });

            this.wp_media_frame.on('select', () => {
                const attachment = this.wp_media_frame.state().get('selection').first().toJSON();
                this.onChange(this.id, attachment.url);
            });
        }

        this.wp_media_frame.open();
    }

    render(formData) {
        const value = this.getValue(formData);

        return (
            <Box key={this.id}>
                <Typography variant="subtitle1">{this.field.title}</Typography>
                <Box sx={{
                    mt: 1,
                    border: '1px dashed #ccc',
                    p: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: '#f5f5f5'
                    }
                }}
                onClick={() => this.openMediaLibrary()}>
                    {value ? (
                        <Box>
                            <img
                                src={value}
                                alt="Selected"
                                style={{maxWidth: '200px', maxHeight: '200px'}}
                            />
                            <Button
                                sx={{mt: 1}}
                                variant="outlined"
                                color="error"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    this.onChange(this.id, '');
                                }}
                            >
                                Remove Image
                            </Button>
                        </Box>
                    ) : (
                        <Typography>Click to select image</Typography>
                    )}
                </Box>
            </Box>
        );
    }
}