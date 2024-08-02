import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUploadedCvById } from "../../services/uploadedCvsApi"; // Import CSS for styling
import { useNavigate } from "react-router-dom";
import { deleteUploadedCv } from "../../services/uploadedCvsApi";

function ViewUploadedCv() {
    const { id } = useParams();
    const [cv, setCv] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await deleteUploadedCv(id);
            navigate('/account');
            
        } catch (error) {
            console.error('Failed to delete CV', error);
        }
    }

    useEffect(() => {
        const fetchCv = async () => {
            try {
                const cvData = await getUploadedCvById(id);
                setCv(cvData);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch CV', error);
                setError(error);
                setLoading(false);
            }
        };
        fetchCv();
    }, [id]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error.message}</div>;
    }

    return (
        <div className="cv-container">
            <h2>Uploaded CV Details</h2>
            
                <h3>{cv.cvComments}</h3>
            
            <div className="cv-content">
                
                <pre>{cv.cvContent}</pre>
                <button onClick={handleDelete}> Delete</button>
            </div>
        </div>
    );
}

export default ViewUploadedCv;
