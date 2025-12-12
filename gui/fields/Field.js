export default class Field {
    constructor(id, field, onChange) {
        this.id = id;
        this.field = field;
        this.onChange = onChange;
    }

    getValue(formData) {
        if (!formData || typeof formData !== 'object') {
            return '';
        }
        return formData[this.id] || '';
    }

    render() {
        throw new Error('render() method must be implemented');
    }
}