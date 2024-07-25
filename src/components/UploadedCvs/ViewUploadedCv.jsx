import React , {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { getUploadedCvById } from "../../services/uploadedCvsApi";

function ViewUploadedCv() {
    const { id } = useParams();
    const [cv, setCv] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCv = async () => {
            try {
                const cv = await getUploadedCvById(id);
                setCv(cv);
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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <p>{cv.cvComment}</p>
            <pre>{cv.cvContent}</pre>
        </div>
    );
}

export default ViewUploadedCv;