// src/pages/NewApplication.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style.css';

function NewApplication() {
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    pay: '',
    jobDescription: '',
    comments: '',
    companyLinkedIn: '',
    poiName: '',
    poiLinkedIn: '',
    extraInfo: '',
    stage: 'research'
  });

  const navigate = useNavigate(); // Use navigate from react-router-dom

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/applications', formData);
      if (response.status === 201) { // Check if creation was successful
        alert('Application added successfully');
        setFormData({
          companyName: '',
          jobTitle: '',
          pay: '',
          jobDescription: '',
          comments: '',
          companyLinkedIn: '',
          poiName: '',
          poiLinkedIn: '',
          extraInfo: '',
          stage: 'research'
        });
        navigate('/applications'); // Redirect after successful creation
      }
    } catch (error) {
      console.error('Failed to add application:', error);
      alert('Failed to add application');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" required />
      <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Job Title" required />
      <input type="text" name="pay" value={formData.pay} onChange={handleChange} placeholder="Pay" required />
      <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange} placeholder="Job Description" required></textarea>
      <textarea name="comments" value={formData.comments} onChange={handleChange} placeholder="Comments"></textarea>
      <input type="text" name="companyLinkedIn" value={formData.companyLinkedIn} onChange={handleChange} placeholder="Company LinkedIn" />
      <input type="text" name="poiName" value={formData.poiName} onChange={handleChange} placeholder="POI Name" />
      <input type="text" name="poiLinkedIn" value={formData.poiLinkedIn} onChange={handleChange} placeholder="POI LinkedIn" />
      <input type="text" name="extraInfo" value={formData.extraInfo} onChange={handleChange} placeholder="Extra Info" />
      <select name="stage" value={formData.stage} onChange={handleChange}>
        <option value="research">Research</option>
        <option value="active">Active</option>
        <option value="applied">Applied</option>
        <option value="follow ups">Follow Ups</option>
        <option value="interviewing">Interviewing</option>
        <option value="offers">Offers</option>
        <option value="reject/reviews">Reject/Reviews</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

export default NewApplication;
