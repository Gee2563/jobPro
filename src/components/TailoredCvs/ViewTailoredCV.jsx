import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTailoredCvById, updateTailoredCv } from "../../services/tailoredCvsApi";

function ViewTailoredCv() {
    const { id } = useParams();
    const [tailoredCv, setTailoredCv] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTailoredCv = async () => {
            try {
                console.log('requesting tailored cv');
                const response = await getTailoredCvById(id);
                setTailoredCv(response);
                setLoading(false);
            } catch (error) {
                console.log('error fetching tailored cv');
                console.error("Failed to fetch tailored CV", error);
                setError(error);
                setLoading(false);
            }
        };
        fetchTailoredCv();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTailoredCv((prevCv) => ({ ...prevCv, [name]: value }));
    };

    const handleUpdate = async () => {
        try {
            await updateTailoredCv(id, tailoredCv);
            alert("Tailored CV updated");
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update tailored CV", error);
        }
    };

    return (
        <div className="view-tailored-cv">
            <h2>Your Tailored CV</h2>
            {isEditing ? (
                <div>
                    <textarea
                        name="tailoredCvContent"
                        value={tailoredCv.tailoredCvContent}
                        onChange={handleChange}
                        rows="10"
                        // Style not working as expected
                        style={{ width: '100%', boxSizing: 'border-box' }} 
                    />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <pre className="tailored-cv-content">{tailoredCv.tailoredCvContent}</pre>
                    <button onClick={handleEdit}>Edit</button>
                </div>
            )}
        </div>
    );
}

export default ViewTailoredCv;
