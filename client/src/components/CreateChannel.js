import React, {useState} from 'react';
import { useChatContext } from 'stream-chat-react';
import { CloseCreateChannel } from '../assets';
import ChannelNameInput from './ChannelNameInput';
import UserList from './UserList';


const CreateChannel = ({createType, setIsCreating}) => {

  const {client, setActiveChannel} = useChatContext();

  const [channelName, setChannelName] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ''])

  const createChannel = async (e) => {
    e.preventDefault();
    try {

      const newChannel = await client.channel(createType, channelName, {name: channelName, members: selectedUsers})
      await newChannel.watch();

      setChannelName('');
      setIsCreating(false);
      setSelectedUsers([client.userID])
      setActiveChannel(newChannel);

    } catch (error) {
      console.log(error);
    }
  }

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
        null
      }
      <UserList setSelectedUsers={setSelectedUsers} selectedUsers={selectedUsers} createType={createType} />
      <div 
        className="create-channel__button-wrapper"
        onClick={createChannel}>
        <p>
          {
            createType ==='team' ? 'Create Team' : 'Create Message Group'
          }
        </p>
      </div>
    </div>
  );
};

export default CreateChannel;