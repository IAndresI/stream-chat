import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

const TeamChanellPreview = ({channel, type, setToggleContainer, setIsCreating, setIsEditing, setActiveChannel}) => {

  const {channel: activeChannel, client} = useChatContext()

  const ChannelPreview = () => (
    <p className="channel-preview__item">
      # {channel?.data?.name || channel?.data?.id}
    </p>
  )

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(({user}) => user.id !== client.user.id);
    return (
      <div className="channel-preview__item single">
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName || members[0]?.user?.id}
          size={24}
        />
        <p>
          {members[0]?.user?.fullName || members[0]?.user?.id}
        </p>
      </div>
    )
  }

  return (
    <button 
      className={
        channel?.id === activeChannel?.id ?
         'channel-preview__wrapper__selected' 
         : 'channel-preview__wrapper'
      }
      onClick={() => {
        setIsCreating(false)
        setIsEditing(false)
        setActiveChannel(channel)
        if(setToggleContainer) {
          setToggleContainer(prev => !prev)
        }
      }}
    >
      {type==='team' ? <ChannelPreview /> : <DirectPreview />}
    </button>
  );
};

export default TeamChanellPreview;