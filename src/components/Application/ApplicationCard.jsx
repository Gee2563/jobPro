import React, { useState } from 'react';
import { Draggable } from "@hello-pangea/dnd";
import Modal from 'react-modal';
import ViewApplication from './ViewApplication'; // Import the ViewApplication component

Modal.setAppElement('#root'); // Ensure app element for accessibility

const ApplicationCard = ({ app, index }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const openModal = () => {
    setModalIsOpen(true);
    setSelectedApplication(app);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedApplication(null);
  };

  return (
    <div>
      <Draggable draggableId={app._id} index={index}>
        {(provided) => (
          <div
            className="app-container"
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <img 
              className="company-logo" 
              src={`https://img.logo.dev/${app.companyWebsite.replace(/(^\w+:|^)\/\//, '')}?token=pk_GS8EES80RXOLepVgd1-2ZQ`} 
              alt="Company Logo" 
            />
            <div>
              <h2 {...provided.dragHandleProps} className="drag-handle">{app.companyName}</h2>
              <p><strong>Job Title:</strong> {app.jobTitle}</p>
              <p><strong>Pay:</strong> {app.pay}</p>
              <p><strong>Applied on:</strong> {new Date(app.applicationDate).toLocaleDateString()}</p>
              <button className='small-button' onClick={openModal}>View Details</button>
            </div>
          </div>
        )}
      </Draggable>

      {/* Modal for application details */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Application Details"
        className="modal"
        overlayClassName="modal-overlay"
      >
        {selectedApplication && (
          <ViewApplication application={selectedApplication} onClose={closeModal} />
        )}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default ApplicationCard;
