import React from 'react';

const NameInput = ({name = '', setName, type='channel'}) => {

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value)
  }

  return (
    <div className="channel-name-input__wrapper">
      <p>{type==='channel' ? 'Enter Channel Name' : 'Search For Users'}</p>
      <input value={name} onChange={handleChange} placeholder={type==='channel' ? `Channel Name` : 'User Name'}/>
    </div>
  );
};

export default NameInput;