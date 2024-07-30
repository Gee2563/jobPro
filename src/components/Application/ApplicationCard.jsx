import React from 'react';
import { Draggable } from "@hello-pangea/dnd";
import { Link } from 'react-router-dom';

const ApplicationCard = ({ app, index }) => {
  // move validator to either NewApplication on submit or backend 
  const validatedDomain = app.companyWebsite.replace(/(^\w+:|^)\/\//, '')
  return(
  <Draggable draggableId={app._id} index={index}>
    {(provided) => (
      <div
        className="app-container"
        ref={provided.innerRef}
        {...provided.draggableProps}
      >
        <img className="company-logo" src={`https://img.logo.dev/${validatedDomain}?token=pk_GS8EES80RXOLepVgd1-2ZQ`} alt="Company Logo" />
        <div>
        <h2 {...provided.dragHandleProps} className="drag-handle">{app.companyName}</h2>
        <p><strong>Job Title:</strong> {app.jobTitle}</p>
        
        <p><strong>Pay:</strong> {app.pay}</p>
        <p><strong>Applied on:</strong> {new Date(app.applicationDate).toLocaleDateString()}</p>
    
        <Link to={`/applications/${app._id}`}>
          <button className='small-button'>View Application</button>
        </Link>
        </div>
      </div>
    )}
  </Draggable>
  )
}


export default ApplicationCard;
