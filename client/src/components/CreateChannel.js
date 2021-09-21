import React, {useState} from 'react';
import { useChatContext } from 'stream-chat-react';
import { CloseCreateChannel } from '../assets';
import ChannelNameInput from './ChannelNameInput';
import UserList from './UserList';


const CreateChannel = ({createType, setIsCreating}) => {

  const {client, setactiveChannel} = useChatContext();

  const [channelName, setChannelName] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ''])

  return (
    <div className="create-channel__container">
      <div className="create-channel__header">
        <p>
          {
            createType ==='team' ? 'Create a New Channel' : 'Send a Direct Message'
          }
        </p>
        <CloseCreateChannel setIsCreating={setIsCreating}/>
      </div>
      {
        createType ==='team' ? 
        (
          <ChannelNameInput
           channelName={channelName}
           setChannelName={setChannelName}
         />
        )
        :
        (
         <ChannelNameInput
           channelName={channelName}
           setChannelName={setChannelName}
         />
        )
      }
      <UserList setSelectedUsers={setSelectedUsers} />
    </div>
  );
};

export default CreateChannel;