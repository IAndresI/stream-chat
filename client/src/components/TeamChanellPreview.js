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
    const members = Object.values(channel.state.members).filter(({user}) => user.id !== client.user.ID);

    return (
      <div className="channel-preview__item single">
        <Avatar
          image={members[0].user.image}
          name={members[0].user.fullName}
          size={24}
        />
        <p>
          {members[0].user.fullName}
        </p>
      </div>
    )
  }

  return (
    <div 
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
    </div>
  );
};

export default TeamChanellPreview;