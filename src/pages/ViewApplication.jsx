import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../style.css';

function ViewApplication() {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track if the form is in edit mode

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axios.get(`/api/applications/${id}`);
        setApplication(response.data);
      } catch (error) {
        console.error('Failed to fetch application', error);
      }
    };
    fetchApplication();
  }, [id]);

  if (!application) {
    return <div>Loading...</div>;
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplication((prevApp) => ({ ...prevApp, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/applications/${id}`, application);
      alert('Application updated');
      setIsEditing(false); // Exit edit mode after successful update
    } catch (error) {
      console.error('Failed to update application', error);
    }
  };

  return (
    <div>
      <h2>{application.companyName}</h2>
      <img src={`https://img.logo.dev/${application.companyWebsite}?token=pk_GS8EES80RXOLepVgd1-2ZQ`} alt="Company Logo" />
      <div>
        <label>Company Website</label>
        {isEditing ? (
          <input
            type="text"
            name="companyWebsite"
            value={application.companyWebsite}
            onChange={handleChange}
          />
        ) : (
          <a href={application.companyWebsite} target="_blank" rel="noreferrer">
            {application.companyWebsite}
          </a>
        )}
      </div>
      <div>
        <label>Job Title:</label>
        {isEditing ? (
          <input
            type="text"
            name="jobTitle"
            value={application.jobTitle}
            onChange={handleChange}
          />
        ) : (
          <span>{application.jobTitle}</span>
        )}
      </div>
      <div>
        <label>Pay:</label>
        {isEditing ? (
          <input
            type="text"
            name="pay"
            value={application.pay}
            onChange={handleChange}
          />
        ) : (
          <span>{application.pay}</span>
        )}
      </div>
      <div>
        <label>Job Description:</label>
        {isEditing ? (
          <textarea
            name="jobDescription"
            value={application.jobDescription}
            onChange={handleChange}
          />
        ) : (
          <span>{application.jobDescription}</span>
        )}
      </div>
      <div>
        <label>Remote/Hybrid:</label>
        {isEditing ? (
          <input
            type="text"
            name="remoteHybrid"
            value={application.remoteHybrid}
            onChange={handleChange}
          />
        ) : (
          <span>{application.remoteHybrid}</span>
        )}
      </div>
      <div>
        <label>Location:</label>
        {isEditing ? (
          <input
            type="text"
            name="location"
            value={application.location}
            onChange={handleChange}
          />
        ) : (
          <span>{application.location}</span>
        )}
      </div>
      <div>
        <label>Comments:</label>
        {isEditing ? (
          <textarea
            name="comments"
            value={application.comments}
            onChange={handleChange}
          />
        ) : (
          <span>{application.comments}</span>
        )}
      </div>
      <div>
        <label>Urgency Score:</label>
        <span>{application.urgencyScore}</span>
      </div>
      <div>
        <label>Stage:</label>
        {isEditing ? (
          <select
            name="stage"
            value={application.stage}
            onChange={handleChange}
          >
            <option value="research">Research</option>
            <option value="active">Active</option>
            <option value="applied">Applied</option>
            <option value="follow-ups">Follow Ups</option>
            <option value="interviewing">Interviewing</option>
            <option value="offers">Offers</option>
            <option value="reject/reviews">Reject/Reviews</option>
          </select>
        ) : (
          <span>{application.stage}</span>
        )}
      </div>
      {isEditing ? (
        <div>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
    </div>
  );
}

export default ViewApplication;
