import Field from './Field';
import { TextField as MUITextField, MenuItem } from '@mui/material';

export default class SelectField extends Field {
    render(formData) {
        const value = this.getValue(formData);

        return (
            <MUITextField
                key={this.id}
                select
                label={this.field.title}
                value={value}
                onChange={(e) => this.onChange(this.id, e.target.value)}
                fullWidth
                margin="normal"
            >
                {this.field.args && this.field.args.options &&
                    Object.entries(this.field.args.options).map(([optionValue, optionLabel]) => (
                        <MenuItem key={optionValue} value={optionValue}>
                            {optionLabel}
                        </MenuItem>
                    ))
                }
            </MUITextField>
        );
    }
}