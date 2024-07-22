import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style.css';

function NewApplication() {
  const [formData, setFormData] = useState({
    companyName: '',
    companyWebsite: '',
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

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    if (!formData.companyWebsite) newErrors.companyWebsite = 'Company website is required';
    if (!formData.jobTitle) newErrors.jobTitle = 'Job title is required';
    if (!formData.pay) newErrors.pay = 'Pay is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await axios.post('/api/applications', formData);
      if (response.status === 201) {
        alert('Application added successfully');
        setFormData({
          companyName: '',
          companyWebsite: '',
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
        navigate('/applications');
      }
    } catch (error) {
      console.error('Failed to add application:', error);
      alert('Failed to add application');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" required />
      {errors.companyName && <div className="error">{errors.companyName}</div>}
      <input type="text" name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} placeholder="Company Website" required />
      {errors.companyWebsite && <div className="error">{errors.companyWebsite}</div>}
      <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Job Title" required />
      {errors.jobTitle && <div className="error">{errors.jobTitle}</div>}
      <input type="text" name="pay" value={formData.pay} onChange={handleChange} placeholder="Pay" required />
      {errors.pay && <div className="error">{errors.pay}</div>}
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
        <option value="follow-ups">Follow Ups</option>
        <option value="interviewing">Interviewing</option>
        <option value="offers">Offers</option>
        <option value="reject/reviews">Reject/Reviews</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

export default NewApplication;
