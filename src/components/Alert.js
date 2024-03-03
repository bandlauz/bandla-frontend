import React from 'react';
import './css/Alert.css';

function Alert({ show, children, onHide }) {
  return (
    <div className={`alert ${show ? 'show' : 'hide'}`}>
      <div className="alert_bg" onClick={onHide}></div>
      <div className="alert_content">
        {children
          .filter((item) => item.key !== 'alert_below_button')
          .map((item) => item)}
        <div className="alert_buttons">
          <button onClick={onHide}>Yopish</button>
          {children.filter((item) => item.key === 'alert_below_button')[0]}
        </div>
      </div>
    </div>
  )
}

export default Alert
