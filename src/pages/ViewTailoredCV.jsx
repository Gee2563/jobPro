import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
                const response = await axios.get(`/api/tailored-cvs/${id}`);
                setTailoredCv(response.data);
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
            await axios.put(`/api/tailored-cvs/${id}`, tailoredCv);
            alert("Tailored CV updated");
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update tailored CV", error);
        }
    };

    return (
        <div>
            <h2>Your Tailored CV</h2>
            {isEditing ? (
                <div>
                    <textarea
                        name="tailoredCvContent"
                        value={tailoredCv.tailoredCvContent}
                        onChange={handleChange}
                        rows="10"
                        cols="50"
                    />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <pre>{tailoredCv.tailoredCvContent}</pre>
                    <button onClick={handleEdit}>Edit</button>
                </div>
            )}
        </div>
    );
}

export default ViewTailoredCv;
