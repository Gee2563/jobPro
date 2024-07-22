import React from 'react';
import { Droppable } from "@hello-pangea/dnd";
import ApplicationCard from './ApplicationCard';

const ApplicationSection = ({ title, applications, sectionId }) => (
  <Droppable droppableId={sectionId}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className="application-section"
      >
        <h2>{title}</h2>
        {applications.length > 0 ? (
          applications.map((app, index) => (
            <ApplicationCard key={app._id} app={app} index={index} />
          ))
        ) : (
          <p>No applications in this category.</p>
        )}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default ApplicationSection;
