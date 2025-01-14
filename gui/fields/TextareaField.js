import Field from './Field';
import { TextField as MUITextField } from '@mui/material';

export default class TextareaField extends Field {
    render(formData) {
        const value = this.getValue(formData);

        return (
            <MUITextField
                key={this.id}
                label={this.field.title}
                value={value}
                onChange={(e) => this.onChange(this.id, e.target.value)}
                multiline
                rows={4}
                fullWidth
                margin="normal"
            />
        );
    }
}