import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';
import { CloseCreateChannel } from '../assets';
import UserList from '../components/UserList'
import ChannelUsersList from './ChannelUsersList';
import ChannelNameInput from './NameInput'


const EditChannel = ({setIsEditing}) => {

  const {channel} = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [currentUsers, setCurrentUsers] = useState([])

  const updateChannel = async (e) => {
    e.preventDefault();
    const nameChanged = channelName === channel?.data?.name || channel?.data?.id;

    if(nameChanged) {
      await channel.update({name: channelName}, {text: `Channel Name Changed To: '${channelName}'`})
    }

    if(selectedUsers.length) {
      await channel.addMembers(selectedUsers)
    }

    if(currentUsers.length) {
      await channel.removeMembers(currentUsers)
    }

    setChannelName(null)
    setIsEditing(false)
    setSelectedUsers([])
  }

  return (
    <div className="edit-channel__container">
      <div className="edit-channel__header">
        <p>Edit Channel</p>
        <CloseCreateChannel setIsEditing={setIsEditing}/>
      </div>
      <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
      <ChannelUsersList setSelectedUsers={setCurrentUsers} selectedUsers={currentUsers} channel={channel}/>
      <UserList setSelectedUsers={setSelectedUsers} selectedUsers={selectedUsers} createType='team'/>
      <div 
        className="edit-channel__button-wrapper"
        onClick={updateChannel}>
        <p>Save Changes</p>
      </div>
    </div>
  );
};

export default EditChannel;