import React, {useState, useEffect} from 'react';
import { getChannel, useChatContext } from 'stream-chat-react';

import {SearchIcon} from '../assets/SearchIcon'

const ChannelSearch = () => {

  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    
  }, [query])

  const getChannel = async (text) => {
    try {
      await getChannel(text)
    }
    catch(err) {
      setQuery('')
    }
    
  }

  const onSerach = (e) => {

    e.preventDefault();
    
    setLoading(true);
    setQuery(e.target.value)
    getChannel(e.target.value)
  }

  if(loading) return "Loading..."

  return (
    <div className="channel-search__container">
      <div className="channel-search__input__wrapper">
        <div className="channel-search__input__icon">
          <SearchIcon />
        </div>
        <input className="channel-search__input__text" placeholder="Search..." type="text" value={query} onChange={onSerach}/>
      </div>
    </div>
  );
};

export default ChannelSearch;