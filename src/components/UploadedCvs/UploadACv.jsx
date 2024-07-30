// src/components/Account.js
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { addUploadedCv, getUploadedCvs} from '../../services/uploadedCvsApi';

function UploadACv() {
  const { user } = useContext(AuthContext);;
  const [cvs, setCvs] = useState([]);
  const [cvContent, setCvContent] = useState('');
  const [cvComments, setCvComments] = useState('');

  useEffect(() => {
    const fetchCvs = async () => {
      try {
        // cons cvs from above is not being updated?
        const cvs = await getUploadedCvs(user.token);
        setCvs(cvs);

      } catch (error) {
        console.error('Failed to fetch CVs', error);
      }
    };
    fetchCvs();
  }, []);



  const handleCvSubmit = async (e) => {
    e.preventDefault();
    const cvFileName = `CV_${new Date().toISOString()}`;

    try {
      const payload = {
        cvComments,
        cvContent,
        cvFileName
      };
      console.log('Submitting CV:', payload);
      const { data } = await addUploadedCv(payload)
        console.log('CV submitted:')
        console.log(data);
        setCvContent('');
        setCvComments('');
        setCvs((prevCvs) => [data, ...
            prevCvs]);


      } catch (error) {
        console.error('Failed to submit CV', error);
        alert('Failed to submit CV');
      }
      
      
    };


  return (
   
    <div>
        <h3>Paste CV</h3>
        <form className="cv-form" onSubmit={handleCvSubmit}>
          <textarea
          className="cv-textarea"
            placeholder="Paste your CV content here"
            value={cvContent}
            onChange={(e) => setCvContent(e.target.value)}
            rows="10"
            cols="50"
          />
          <input
          className='cv-comments'
            type="text"
            placeholder="Add comments for your CV"
            value={cvComments}
            onChange={(e) => setCvComments(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
       
    </div>
    );
}

export default UploadACv;
