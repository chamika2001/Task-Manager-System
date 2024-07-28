import React from 'react';
import '../styles/modal.css'; 

const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        {imageUrl === 'No Image' ? (
          <p>No Image</p>
        ) : (
          <img src={imageUrl} alt="Task" />
        )}
      </div>
    </div>
  );
};

export default ImageModal;
