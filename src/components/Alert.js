import React from 'react';
import './css/Alert.css'

function Alert({ show, message, onHide, onDelete }) {
  return (
    <div className={`alert ${show ? 'show' : 'hide'}`}>
      <div className="alert_bg" onClick={onHide}></div>
      <div className="alert_content">
        <p>{message}</p>
        <div className="alert_buttons">
          <button onClick={onHide}>Cancel</button>
          <button onClick={onDelete} className="delete_button">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Alert;
