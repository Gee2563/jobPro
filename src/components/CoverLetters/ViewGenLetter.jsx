import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGenLetterById, updateGenLetter } from "../../services/genLetterApi";

function ViewGenLetter() {
    const { id } = useParams();
    const [genLetter, setGenLetter] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGenLetter = async () => {
            try {
                console.log('requesting cover letter');
                const response = await getGenLetterById(id);
                setGenLetter(response.genLetterContent);
                console.log('cover letter: ', response.genLetterContent);
                setLoading(false);
            } catch (error) {
                console.log('error fetching cover letter');
                console.error("Failed to fetch cover letter", error);
                setError(error);
                setLoading(false);
            }
        };
        fetchGenLetter();
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
        setGenLetter((prevLetter) => ({ ...prevLetter, [name]: value }));
    };

    const handleUpdate = async () => {
        try {
            await updateGenLetter(id, genLetter);
            alert("cover letter updated");
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update cover letter", error);
        }
    };

    return (
        <div className="view-gpt-response">
            <h2>Your cover letter</h2>
            {isEditing ? (
                <div>
                    <textarea
                        name="GenLetterContent"
                        value={genLetter}
                        onChange={handleChange}
                        rows="10"
                        // Style not working as expected
                    />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <pre className="view-gpt-content">{genLetter}</pre>
                    <button onClick={handleEdit}>Edit</button>
                </div>
            )}
        </div>
    );
}

export default ViewGenLetter;
