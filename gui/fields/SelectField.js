import Field from './Field';
import { Select } from '@chakra-ui/react';

export default class SelectField extends Field {
    render(formData) {
        const value = this.getValue(formData);

        return (
            <Select
                key={this.id}
                placeholder={this.field.title || this.field.name || ''}
                value={value}
                onChange={(e) => this.onChange(this.id, e.target.value)}
                width="100%"
                mb={3}
            >
                {this.field.options && Object.entries(this.field.options).map(([optValue, label]) => (
                    <option key={optValue} value={optValue}>{label}</option>
                ))}
            </Select>
        );
    }
}