import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import  { getUploadedCvs } from '../../services/uploadedCvsApi';
import ViewUploadedCv from './ViewUploadedCv';

function AllUploadedCv() {
    const [cvs, setCvs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchCvs = async () => {
        try {
            const cvs = await getUploadedCvs();
            setCvs(cvs);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch CVs', error);
            setError(error);
            setLoading(false);
        }
        };
        fetchCvs();
    }, []);
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    

    return (
        <>
        <h2>All Uploaded CVs</h2>
        {cvs.map(cv => (
            <div>
            <h2>{cv.cvComments}</h2>
            <p> {cv.cvContent}</p>
        </div>
        ))}

        <Link to="/upload-cv">Upload a CV</Link>

        </>
    );
    
}

    export default AllUploadedCv;