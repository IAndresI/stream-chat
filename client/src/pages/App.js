import React from 'react'
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
import ChanellListContainer from '../components/ChanellListContainer';
import ChanellContainer from '../components/ChanellContainer';
import dotenv from 'dotenv';
import Auth from '../components/Auth'
import '../App.css';

dotenv.config();

const client = StreamChat.getInstance(process.env.REACT_APP_API_KEY)

const authToken = false;

function App() {

  if(!authToken) return <Auth />

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team dark">

        <ChanellListContainer />

        <ChanellContainer />

      </Chat>
    </div>
  );
}

export default App;
