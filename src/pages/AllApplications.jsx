import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext } from "@hello-pangea/dnd";
import axios from 'axios';
import ApplicationSection from '../components/ApplicationSection';
import '../style.css';


// Needs refactoring - not happy with the fact I have axios calls in the component
function AllApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('/api/applications');
        setApplications(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const sourceIndex = applications.findIndex(app => app._id === result.draggableId);
    const destinationStage = result.destination.droppableId;
    const updatedApplications = [...applications];
    const updatedApplication = {
      ...updatedApplications[sourceIndex],
      stage: destinationStage,
    };
    updatedApplications[sourceIndex] = updatedApplication;
    setApplications(updatedApplications);

    // Update the application stage in the backend
    try {
      const token = localStorage.getItem('token'); 
      await axios.put(`/api/applications/${result.draggableId}`, updatedApplication);
      // will remove this line when I'm 100% happy with the code
      alert('Application stage updated');
    } catch (error) {
      console.error('Failed to update application stage:', error);

    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const applicationStages = [
    { title: 'Active and Researching', filter: app => ['active', 'research'].includes(app.stage), sectionId: 'active_research' },
    { title: 'Applied', filter: app => app.stage === 'applied', sectionId: 'applied' },
    { title: 'Follow-Ups', filter: app => app.stage === 'follow-ups', sectionId: 'follow-ups' },
    { title: 'Interviewing', filter: app => app.stage === 'interviewing', sectionId: 'interviewing' },
    { title: 'Rejected and Reviews', filter: app => app.stage === 'reject/reviews', sectionId: 'reject/reviews' },
  ];

  return (
    <div id='all-applications'>
      <h1>All Applications</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {applicationStages.map(({ title, filter, sectionId }) => (
            <ApplicationSection
              key={sectionId}
              title={title}
              applications={applications.filter(filter)}
              sectionId={sectionId}
            />
          ))}
        </div>
      </DragDropContext>
      <Link to="/new-application">
        <button>Create New Application</button>
      </Link>
    </div>
  );
}

export default AllApplications;
