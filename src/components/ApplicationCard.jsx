import React from 'react';
import { Draggable } from "@hello-pangea/dnd";
import { Link } from 'react-router-dom';

const ApplicationCard = ({ app, index }) => {
  const validatedDomain = app.companyWebsite.replace(/(^\w+:|^)\/\//, '')
  return(
  <Draggable draggableId={app._id} index={index}>
    {(provided) => (
      <div
        className="app-container"
        ref={provided.innerRef}
        {...provided.draggableProps}
      >
        <h2 {...provided.dragHandleProps} className="drag-handle">{app.companyName}</h2>
        <p><strong>Job Title:</strong> {app.jobTitle}</p>
        <img src={`https://img.logo.dev/${validatedDomain}?token=pk_GS8EES80RXOLepVgd1-2ZQ`} alt="Company Logo" />
        <p><strong>Pay:</strong> {app.pay}</p>
        <p><strong>Application Date:</strong> {new Date(app.applicationDate).toLocaleDateString()}</p>
        <p><strong>Stage:</strong> {app.stage}</p>
        <p><strong>Comments:</strong> {app.comments}</p>
        <Link to={`/application/${app._id}`}>
          <button>View Application</button>
        </Link>
      </div>
    )}
  </Draggable>
  )
}


export default ApplicationCard;
