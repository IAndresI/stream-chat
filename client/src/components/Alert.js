import React, {useEffect} from 'react';
import SuccessIcon from '../assets/SuccessIcon';
import ErrorIcon from '../assets/ErrorIcon';
import InfoIcon from '../assets/InfoIcon';
import WarningIcon from '../assets/WarningIcon';
import { ALERT_INFO, ALERT_WARNING, ALERT_ERROR, ALERT_SUCCESS } from '../utils/consts';

const Alert = ({status: {open, timer, type, text}, setStatus}) => {

  useEffect(() => {
    if(open) {
      const time = setTimeout(() => {
        setStatus({open: false, timer, type, text})
      }, timer)

      return () => clearTimeout(time)
    }
  }, [timer, type, text, setStatus, open])

  const getBackgroundColor = (type) => {
    switch(type) {
      case ALERT_INFO.type:
        return "#2196f3";
      case ALERT_WARNING.type:
        return "#ff9800";
      case ALERT_ERROR.type:
        return "#f44336";
      case ALERT_SUCCESS.type:
        return "#4caf50";
      default: 
        return "#2196f3";
    }
  }

  const getIcon = (type) => {
    switch(type) {
      case ALERT_INFO.type:
        return <InfoIcon />;
      case ALERT_WARNING.type:
        return <WarningIcon />;
      case ALERT_ERROR.type:
        return <ErrorIcon />;
      case ALERT_SUCCESS.type:
        return <SuccessIcon />;
      default: 
        return <InfoIcon />;
    }
  }

  return (
    <div className='alert'>
      <button 
        className={`alert__wrapper ${open ? 'alert--open' : ''}`}
        style={{backgroundColor: getBackgroundColor(type)}}
        onClick={() => {
          if(open) {
            setStatus({open: false, timer, type, text})
          }
        }}
        >
        {getIcon(type)}
        <div className='alert__text'>
          {text}
        </div>
      </button>
    </div>
  );
};

export default Alert;