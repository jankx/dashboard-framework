import Field from './Field';
import { Textarea, FormControl, FormLabel } from '@chakra-ui/react';

export default class TextareaField extends Field {
    render(formData) {
        const value = this.getValue(formData);

        return (
            <FormControl key={this.id}>
                <FormLabel>{this.field.title}</FormLabel>
                <Textarea
                    value={value}
                    onChange={(e) => this.onChange(this.id, e.target.value)}
                    rows={4}
                />
            </FormControl>
        );
    }
}