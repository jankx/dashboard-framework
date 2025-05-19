import Field from './Field';
import { Box, Text, IconButton } from '@chakra-ui/react';

const AddIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);

export default class IconField extends Field {
    openIconPicker() {
        if (typeof wp.media.view.MediaFrame.IconPicker === 'undefined') {
            console.error('Icon Picker not found');
            return;
        }

        wp.media.view.MediaFrame.IconPicker.selectIcon({
            target: this.id,
            onSelect: (icon) => {
                this.onChange(this.id, icon);
            }
        });
    }

    render(formData) {
        const value = this.getValue(formData);

        return (
            <Box key={this.id}>
                <Text fontSize="md" fontWeight="semibold">{this.field.title}</Text>
                <Box
                    mt={1}
                    display="flex"
                    alignItems="center"
                    gap={2}
                >
                    {value ? (
                        <Box
                            width={40}
                            height={40}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            border="1px solid #ddd"
                            borderRadius={1}
                        >
                            <i className={value}></i>
                        </Box>
                    ) : null}

                    <IconButton
                        onClick={() => this.openIconPicker()}
                        border="1px dashed #ccc"
                        borderRadius={1}
                        width={40}
                        height={40}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
            </Box>
        );
    }
}