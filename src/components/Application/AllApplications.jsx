import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext } from "@hello-pangea/dnd";
import { getAllApplications, updateApplicationStage, updatedApplication } from '../../services/applicationApi';
import ApplicationSection from './ApplicationSection';


function AllApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getAllApplications();
        console.log('Response:', response); // Should log the response object
        setApplications(response || []); // Access the correct part of the response
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
      
      await updateApplicationStage(result.draggableId, destinationStage);
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
    { title: 'Active and Researching', filter: app => ['active/research'].includes(app.stage), sectionId: 'active/research' },
    { title: 'Applied', filter: app => app.stage === 'applied', sectionId: 'applied' },
    { title: 'Follow-Ups', filter: app => app.stage === 'follow-ups', sectionId: 'follow-ups' },
    { title: 'Interviewing', filter: app => app.stage === 'interviewing', sectionId: 'interviewing' },
    { title: 'Rejected and Reviews', filter: app => app.stage === 'reject/reviews', sectionId: 'reject/reviews' },
  ];

  return (
    console.log('Applications:', applications),

    <main>
      <div className='top-container'>
      <h1>All Applications</h1>
      <Link to="/applications/new">
        <button>Create New Application</button>
      </Link>

      </div>
      
      <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex w-full flex-col lg:flex-row">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {applicationStages.map(({ title, filter, sectionId }) => (
            <div className="card bg-base-300 rounded-box grid h-32 flex-grow place-items-center">
            <ApplicationSection
              key={sectionId}
              title={title}
              applications={applications.filter(filter)}
              sectionId={sectionId}
            />
            <div className="divider lg:divider-horizontal"></div>
            </div>
          ))}
            </div>
        </div>
      </DragDropContext>
  
    </main>
  );
}

export default AllApplications;
