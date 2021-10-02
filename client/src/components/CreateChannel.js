import React, {useState, useContext} from 'react';
import { useChatContext } from 'stream-chat-react';
import { CloseCreateChannel } from '../assets';
import AlertContext from '../context/AlertContext';
import { ALERT_ERROR } from '../utils/consts';
import NameInput from './NameInput';
import UserList from './UserList';


const CreateChannel = ({createType, setIsCreating}) => {

  const {client, setActiveChannel} = useChatContext();
  const setAlert = useContext(AlertContext)

  const [channelName, setChannelName] = useState('')
  const [userName, setUserName] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ''])

  const createChannel = async (e) => {
    e.preventDefault();
    try {

      if(channelName.trim().length < 2) {
        setAlert({
          ...ALERT_ERROR,
          text: 'Channel name must be more than 2 characters',
          timer: 7000,
          open: true
        })
      }

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
          <NameInput
            name={channelName}
            setName={setChannelName}
         />
        )
        :
        null
      }
      <NameInput
        name={userName}
        setName={setUserName}
        type='user'
      />
      <UserList setSelectedUsers={setSelectedUsers} selectedUsers={selectedUsers} createType={createType} search={createType ==='team' ? userName : null} />
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