import { ChannelList, useChatContext } from "stream-chat-react";
import CompanyHeader from "./CompanyHeader";
import SideBar from "./SideBar";
import TeamChanellPreview from "./TeamChanellPreview";
import TeamChannelList from "./TeamChannelList";
import ChannelSearch from "./ChannelSearch";


const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type==='team')
}

const customChannelMessagingFilter = (messages) => {
  return messages.filter((message) => message.type==='messaging')
}

const ChannelListContent = ({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
  setToggleContainer
}) => {

  const {client} = useChatContext();

  const filters = {members: {$in: [client.userID]}}

  return (
    <>
      <SideBar />
      <div className="channel-list__list__wrapper">

        <CompanyHeader />
        <ChannelSearch
          setToggleContainer={setToggleContainer}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => {
            return <TeamChannelList
              {...listProps}
              type='team'
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          }}
          Preview={(previewProps) => (
            <TeamChanellPreview 
              {...previewProps} 
              type='team'
              setToggleContainer={setToggleContainer}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}/>
          )}
        />

        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => {
            return <TeamChannelList
              {...listProps} 
              type='messaging'
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          }}
          Preview={(previewProps) => (
            <TeamChanellPreview 
              {...previewProps} 
              type='messaging'
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}/>
          )}
        />  

      </div>
    </>
  );
};

export default ChannelListContent;