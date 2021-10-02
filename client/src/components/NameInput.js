import React from 'react';

const NameInput = ({channelName = '', setChannelName, type='channel'}) => {

  const handleChange = (e) => {
    e.preventDefault();
    setChannelName(e.target.value)
  }

  return (
    <div className="channel-name-input__wrapper">
      <p>{type==='channel' ? 'Enter Channel Name' : 'Search For Users'}</p>
      <input value={channelName} onChange={handleChange} placeholder={type==='channel' ? `Channel Name` : 'User Name'}/>
    </div>
  );
};

export default NameInput;