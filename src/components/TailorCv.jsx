import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TailorCv = () => {
    const [allCv, setAllCv] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        originalCvContent: '',
        companyWebsite: '',
        jobDescriptionUrl: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [cvResponse, tailorCvResponse] = await Promise.all([
                    axios.get('/api/uploaded-cvs'),
                    axios.get('/api/tailored-cvs')
                ]);
                setAllCv(cvResponse.data || []);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch data:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.originalCvContent) newErrors.originalCvContent = 'Original CV content is required';
        if (!formData.companyWebsite) newErrors.companyWebsite = 'Company website is required';
        if (!formData.jobDescriptionUrl) newErrors.jobDescriptionUrl = 'Job description URL is required';
        return newErrors;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            console.log('Form data:', formData);
            const response = await axios.post('/api/tailored-cvs', formData);
            if (response.status === 201) {
                alert('Tailored CV added successfully');
                setFormData({
                    originalCvContent: '',
                    companyWebsite: '',
                    jobDescriptionUrl: '',
                });
                navigate('/tailor-cv/' + response.data._id);
            }
        } catch (error) {
            console.error('Failed to add tailored CV:', error);
            alert('Failed to add tailored CV');
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Tailor CV</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Original CV Content:
                    <select name="originalCvContent" value={formData.originalCvContent} onChange={handleChange} required>
                        <option value="">Select a CV</option>
                        {allCv.map((cv) => (
                            <option key={cv._id} value={cv.cvContent}>{cv.cvComments}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Company Website:
                    <input type="text" name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} placeholder="Company Website" required />
                </label>
                <label>
                    Job Description URL:
                    <input type="text" name="jobDescriptionUrl" value={formData.jobDescriptionUrl} onChange={handleChange} placeholder="Job Description URL" required />
                </label>
                <button type="submit">Tailor CV</button>
            </form>
            {Object.keys(errors).length > 0 && (
                <div>
                    <ul>
                        {Object.keys(errors).map((key) => (
                            <li key={key}>{errors[key]}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default TailorCv;
