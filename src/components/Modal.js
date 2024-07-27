import React, { useEffect } from 'react';
import '../styles/login.css'; // Ensure modal styles are included

const Modal = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div id="custom-modal" onClick={onClose}>
      <div id="custom-modal-content" onClick={(e) => e.stopPropagation()}>
        <span id="custom-close" onClick={onClose}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Modal;
