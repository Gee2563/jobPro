import React, { useState } from 'react';
import { updateApplication } from '../../services/applicationApi'; // Import the function

const ViewApplication = ({ application, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedApplication, setUpdatedApplication] = useState(application);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedApplication((prevApp) => ({ ...prevApp, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await updateApplication(updatedApplication._id, updatedApplication);
      alert('Application updated');
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update application', error);
    }
  };

  return (
    <div className='view-application-container'>
      <div className="view-application-card">
        <div className="view-app-top-container">
          <div className="view-app-top-left-side">
            <img
              src={`https://img.logo.dev/${application.companyWebsite}?token=pk_GS8EES80RXOLepVgd1-2ZQ`}
              alt="Company Logo"
            />
          </div>
          <div className="view-app-top-right-side">
            <h2>{application.companyName}</h2>
            <label>Company Website:
              {isEditing ? (
                <input
                  type="text"
                  name="companyWebsite"
                  value={updatedApplication.companyWebsite}
                  onChange={handleChange}
                />
              ) : (
                <a href={application.companyWebsite} target="_blank" rel="noreferrer">
                  {application.companyWebsite}
                </a>
              )}
            </label>
            <label>Job Title:
              {isEditing ? (
                <input
                  type="text"
                  name="jobTitle"
                  value={updatedApplication.jobTitle}
                  onChange={handleChange}
                />
              ) : (
                <span>{application.jobTitle}</span>
              )}
            </label>
            <label>Pay:
              {isEditing ? (
                <input
                  type="text"
                  name="pay"
                  value={updatedApplication.pay}
                  onChange={handleChange}
                />
              ) : (
                <span>{application.pay}</span>
              )}
            </label>
          </div>
        </div>
        <div className="view-app-bottom-container">
          <label>Job Description:
            {isEditing ? (
              <textarea
                name="jobDescription"
                value={updatedApplication.jobDescription}
                onChange={handleChange}
              />
            ) : (
              <span>{application.jobDescription}</span>
            )}
          </label>
          <label>Remote/Hybrid:
            {isEditing ? (
              <input
                type="text"
                name="remoteHybrid"
                value={updatedApplication.remoteHybrid}
                onChange={handleChange}
              />
            ) : (
              <span>{application.remoteHybrid}</span>
            )}
          </label>
          <label>Location:
            {isEditing ? (
              <input
                type="text"
                name="location"
                value={updatedApplication.location}
                onChange={handleChange}
              />
            ) : (
              <span>{application.location}</span>
            )}
          </label>
          <label>Comments:
            {isEditing ? (
              <textarea
                name="comments"
                value={updatedApplication.comments}
                onChange={handleChange}
              />
            ) : (
              <span>{application.comments}</span>
            )}
          </label>
          <label>Application Date:
            {isEditing ? (
              <input
                type="date"
                name="applicationDate"
                value={updatedApplication.applicationDate}
                onChange={handleChange}
              />
            ) : (
              <span>{application.applicationDate}</span>
            )}
          </label>
          <label>Stage:
            {isEditing ? (
              <select
                name="stage"
                value={updatedApplication.stage}
                onChange={handleChange}
              >
                <option value="active/research">Active/Researching</option>
                <option value="applied">Applied</option>
                <option value="interviewing">Interviewing</option>
                <option value="offers">Offers</option>
                <option value="reject/reviews">Reject/Reviews</option>
              </select>
            ) : (
              <span>{application.stage}</span>
            )}
          </label>
        </div>
        <div>
          {isEditing ? (
            <div>
              <button onClick={handleUpdate}>Update</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            <button onClick={handleEdit}>Edit</button>
          )}
        </div>
      
      </div>
    </div>
  );
};

export default ViewApplication;
