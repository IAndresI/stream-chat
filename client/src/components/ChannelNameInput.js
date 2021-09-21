import React, {useState} from 'react';
import { useChatContext } from 'stream-chat-react';

const ChannelNameInput = ({channelName = '', setChannelName}) => {

  const handleChange = (e) => {
    e.preventDefault();
    setChannelName(e.target.value)
  }

  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input value={channelName} onChange={handleChange} placeholder="Channel Name"/>
      <p>Add Members</p>
    </div>
  );
};

export default ChannelNameInput;