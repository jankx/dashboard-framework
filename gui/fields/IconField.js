import Field from './Field';
import { Box, Typography, IconButton } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

export default class IconField extends Field {
    openIconPicker() {
        if (typeof window.iconPicker === 'undefined') {
            console.error('Icon Picker not found');
            return;
        }

        window.iconPicker.open({
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
                <Typography variant="subtitle1">{this.field.title}</Typography>
                <Box sx={{
                    mt: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                }}>
                    {value ? (
                        <Box sx={{
                            width: 40,
                            height: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #ddd',
                            borderRadius: 1
                        }}>
                            <i className={value}></i>
                        </Box>
                    ) : null}

                    <IconButton
                        onClick={() => this.openIconPicker()}
                        sx={{
                            border: '1px dashed #ccc',
                            borderRadius: 1,
                            width: 40,
                            height: 40
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
            </Box>
        );
    }
}