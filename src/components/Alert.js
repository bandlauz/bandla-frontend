import React from 'react';
import './css/Alert.css';

function Alert({ show, bgNone, children, onHide }) {
  return (
    <div className={`alert ${show ? 'show' : 'hide'}`}>
      <div className="alert_bg" onClick={onHide}></div>
      <div className={`alert_content ${bgNone ? 'bg_none' : ''}`}>
        {children.filter((item) => !item.props.buttonkey)}
        <div className="alert_buttons">
          {children.filter((item) => item.props.buttonkey)}
        </div>
      </div>
    </div>
  );
}

export default Alert;
