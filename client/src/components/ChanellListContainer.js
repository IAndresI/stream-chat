import React from 'react';
import {ChannelList, useChatContext} from 'stream-chat-react';
import ChannelSearch from './ChannelSearch';
import CompanyHeader from './CompanyHeader';
import SideBar from './SideBar';
import TeamChannelList from './TeamChannelList'
import TeamChanellPreview from './TeamChanellPreview';

const ChanellListContainer = ({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing
}) => {
  return (
    <>
      <SideBar />
      <div className="channel-list__list__wrapper">

        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => {
            return <TeamChannelList
              {...listProps}
              type='team'
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
            />
          }}
          Preview={(previewProps) => (
            <TeamChanellPreview {...previewProps} type='team'/>
          )}
        />

        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => {
            return <TeamChannelList
              {...listProps} 
              type='messaging'
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
            />
          }}
          Preview={(previewProps) => (
            <TeamChanellPreview {...previewProps} type='messaging'/>
          )}
        />  

      </div>
    </>
  );
};

export default ChanellListContainer;