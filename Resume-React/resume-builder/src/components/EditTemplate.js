import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { handleSuccess, handleError } from '../utils';

const EditTemplate = () => {
    const { templateId } = useParams();
    const [templateContent, setTemplateContent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the template content based on the templateId
        fetchTemplateContent();
    }, [templateId]);

    const fetchTemplateContent = async () => {
        try {
            const response = await fetch(`http://localhost:5000/templates/${templateId}`);
            const data = await response.json();
            setTemplateContent(data.fields);  // Assuming `data.fields` contains an array of fields/sections
            setLoading(false);
        } catch (error) {
            handleError('Error fetching template content');
            setLoading(false);
        }
    };

    const handleInputChange = (index, value) => {
        const updatedContent = [...templateContent];
        updatedContent[index].value = value;  // Assuming each field has a `value` property
        setTemplateContent(updatedContent);
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`http://localhost:5000/templates/${templateId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fields: templateContent }),
            });

            const result = await response.json();

            if (result.success) {
                handleSuccess('Template updated successfully');
            } else {
                handleError(result.message || 'Failed to update template');
            }
        } catch (error) {
            handleError('Error saving template');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Edit Template {templateId}</h1>
            <form>
                {templateContent.map((field, index) => (
                    <div key={index} className="mb-3">
                        <label htmlFor={`field-${index}`}>{field.label}</label>
                        <input
                            type="text"
                            id={`field-${index}`}
                            className="form-control"
                            value={field.value}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                    </div>
                ))}
            </form>
            <button className="btn btn-primary" onClick={handleSaveChanges}>
                Save Changes
            </button>
        </div>
    );
};

export default EditTemplate;
