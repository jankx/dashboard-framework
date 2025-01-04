import React, { useState, useEffect } from 'react';

const OptionFrameworkApp = ({ optionsData, instanceName }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        // Load saved data from localStorage or initialize with empty object
        const savedData = JSON.parse(localStorage.getItem(instanceName)) || {};
        setFormData(savedData);
    }, [instanceName]);

    const handleChange = (fieldId, value) => {
        setFormData(prevData => ({ ...prevData, [fieldId]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save data to localStorage
        localStorage.setItem(instanceName, JSON.stringify(formData));
        // Optionally, send data to the server
        // fetch('/path/to/save', { method: 'POST', body: JSON.stringify(formData) });
    };

    const renderField = (fieldId, field) => {
        const value = formData[fieldId] || '';

        switch (field.type) {
            case 'input':
                return (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(fieldId, e.target.value)}
                    />
                );

            case 'textarea':
                return (
                    <textarea
                        value={value}
                        onChange={(e) => handleChange(fieldId, e.target.value)}
                    />
                );

            case 'select':
                return (
                    <select
                        value={value}
                        onChange={(e) => handleChange(fieldId, e.target.value)}
                    >
                        {Object.entries(field.args.options).map(([optionValue, optionLabel]) => (
                            <option key={optionValue} value={optionValue}>
                                {optionLabel}
                            </option>
                        ))}
                    </select>
                );

            // Add more field types as needed
            // Example for a switch control
            case 'switch':
                return (
                    <label>
                        <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleChange(fieldId, e.target.checked)}
                        />
                        {field.title}
                    </label>
                );

            // Add cases for other field types like radio, multi-select, etc.

            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {Object.entries(optionsData).map(([sectionId, section]) => (
                <div key={sectionId}>
                    <h2>{section.title}</h2>
                    {Object.entries(section.fields).map(([fieldId, field]) => (
                        <div key={fieldId}>
                            <label>{field.title}</label>
                            {renderField(fieldId, field)}
                        </div>
                    ))}
                </div>
            ))}
            <button type="submit">Lưu</button>
        </form>
    );
};

export default OptionFrameworkApp;
