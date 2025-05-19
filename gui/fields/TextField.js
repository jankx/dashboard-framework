import Field from './Field';
import { Input, FormControl, FormLabel } from '@chakra-ui/react';

export default class TextField extends Field {
    render(formData) {
        const value = this.getValue(formData);

        return (
            <FormControl key={this.id}>
                <FormLabel>{this.field.title}</FormLabel>
                <Input
                    value={value}
                    onChange={(e) => this.onChange(this.id, e.target.value)}
                />
            </FormControl>
        );
    }
}