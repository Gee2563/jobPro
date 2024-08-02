import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import  { getUploadedCvs } from '../../services/uploadedCvsApi';


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
        <div className='all-uploaded-cvs'>
        <h2>All Uploaded CVs</h2>
        <ul>
        {cvs.map(cv => (
            console.log(cv),
            <li key={cv.id}>
            <Link to={`/uploadedcv/${cv._id}`}>{cv.cvComments}</Link>
            </li>
        ))}
        </ul>
        </div>
    );
    
}

    export default AllUploadedCv;