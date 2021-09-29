import React, {useState} from 'react'
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
import ChanellListContainer from '../components/ChanellListContainer';
import ChanellContainer from '../components/ChanellContainer';
import dotenv from 'dotenv';
import Auth from '../components/Auth'
import Cookies from 'universal-cookie';
import AlertContext from '../context/AlertContext';
import Alert from '../components/Alert';

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

  const [alert, setAlert] = useState({
    open: false,
    type: '',
    text: 'Theres some text for test'
  })
  
  return (
    <div className="app__wrapper">
      <AlertContext.Provider value={setAlert}>
        {
          !authToken ? 
          <Auth /> 
          :
          <Chat client={client} theme="team">
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
        }
        
      </AlertContext.Provider>
      <Alert status={alert} setStatus={setAlert}/>
    </div>
  );
}

export default App;
