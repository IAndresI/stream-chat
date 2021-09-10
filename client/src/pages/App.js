import React, {useState} from 'react'
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
import ChanellListContainer from '../components/ChanellListContainer';
import ChanellContainer from '../components/ChanellContainer';
import dotenv from 'dotenv';
import Auth from '../components/Auth'
import Cookies from 'universal-cookie';

import 'stream-chat-react/dist/css/index.css'
import '../App.css';

dotenv.config();

const client = StreamChat.getInstance(process.env.REACT_APP_API_KEY)

const cookies = new Cookies();

const authToken = cookies.get('token')

if (authToken) {
  client.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('userName'),
    fullName: cookies.get('fullName'),
    image: cookies.get('avatarURL'),
    phoneNumber: cookies.get('phoneNumber'),
    hashedPassword: cookies.get('hashedPassword'),
  }, authToken)
}

function App() {

  const [createType, setCreateType] = useState('')
  const [isCreating, setIsCreating] = useState('')
  const [isEditing, setIsEditing] = useState('')

  if(!authToken) return <Auth />
  
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team dark">

        <ChanellListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />

        <ChanellContainer
          createType={createType}
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />

      </Chat>
    </div>
  );
}

export default App;
