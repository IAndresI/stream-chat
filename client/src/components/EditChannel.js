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
  const [selectedCurrentUsers, setSelectedCurrentUsers] = useState([])
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

    if(selectedCurrentUsers.length) {
      await channel.removeMembers(selectedCurrentUsers)
    }

    setChannelName(null)
    setIsEditing(false)
    setSelectedUsers([])
  }

  console.log(currentUsers);

  return (
    <div className="edit-channel__container">
      <div className="edit-channel__header">
        <p>Edit Channel</p>
        <CloseCreateChannel setIsEditing={setIsEditing}/>
      </div>
      <ChannelNameInput name={channelName} setName={setChannelName} />
      <ChannelUsersList setSelectedCurrentUsers={setSelectedCurrentUsers} selectedCurrentUsers={selectedCurrentUsers} setCurrentUsers={setCurrentUsers} channel={channel}/>
      <UserList setSelectedUsers={setSelectedUsers} selectedUsers={selectedUsers} currentUsers={currentUsers} createType='team'/>
      <div 
        className="edit-channel__button-wrapper"
        onClick={updateChannel}>
        <p>Save Changes</p>
      </div>
    </div>
  );
};

export default EditChannel;