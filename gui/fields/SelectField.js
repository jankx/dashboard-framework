import Field from './Field';
import { Select, FormControl, FormLabel } from '@chakra-ui/react';

export default class SelectField extends Field {
    render(formData) {
        const value = this.getValue(formData);

        return (
            <FormControl key={this.id}>
                <FormLabel>{this.field.title}</FormLabel>
                <Select
                    value={value}
                    onChange={(e) => this.onChange(this.id, e.target.value)}
                >
                    {this.field.args && this.field.args.options &&
                        Object.entries(this.field.args.options).map(([optionValue, optionLabel]) => (
                            <option key={optionValue} value={optionValue}>
                                {optionLabel}
                            </option>
                        ))
                    }
                </Select>
            </FormControl>
        );
    }
}