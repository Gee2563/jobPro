import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style.css';

function AllApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('/api/applications');
        setApplications(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const renderApplications = (apps) => {
    return apps.map((app, index) => (
      <div key={app._id} className="app-container">
        <h2>{app.companyName}</h2>
        <p><strong>Job Title:</strong> {app.jobTitle}</p>
        <img src={`https://img.logo.dev/${app.companyWebsite}?token=pk_GS8EES80RXOLepVgd1-2ZQ`} alt="Company Logo" />
        <p><strong>Pay:</strong> {app.pay}</p>
        <p><strong>Application Date:</strong> {new Date(app.applicationDate).toLocaleDateString()}</p>
        <p><strong>Stage:</strong> {app.stage}</p>
        <p><strong>Comments:</strong> {app.comments}</p>
        <Link to={`/application/${app._id}`}>
          <button>View Application</button>
        </Link>
      </div>
    ));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div id='all-applications'>
      <h1>All Applications</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h2>Active and Researching</h2>
          {renderApplications(applications.filter(app => ['active', 'research'].includes(app.stage)))}
        </div>
        <div>
          <h2>Applied</h2>
          {renderApplications(applications.filter(app => app.stage === 'applied'))}
        </div>
        <div>
          <h2>Follow-Ups</h2>
          {renderApplications(applications.filter(app => app.stage === 'follow ups'))}
        </div>
        <div>
          <h2>Interviewing</h2>
          {renderApplications(applications.filter(app => app.stage === 'interviewing'))}
        </div>
        <div>
          <h2>Rejected and Reviews</h2>
          {renderApplications(applications.filter(app => app.stage === 'reject/reviews'))}
        </div>
      </div>
      <Link to="/new-application">
        <button>Create New Application</button>
      </Link>
    </div>
  );
}

export default AllApplications;
