import React from 'react';
import {ChannelList, useChatContext} from 'stream-chat-react';
import ChannelSearch from './ChannelSearch';
import CompanyHeader from './CompanyHeader';
import SideBar from './SideBar';
import TeamChanellList from './TeamChanellList'
import TeamChanellPreview from './TeamChanellPreview';

const ChanellListContainer = () => {
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
            return <TeamChanellList {...listProps} type='team'/>
          }}
          Preview={(previewProps) => (
            <TeamChanellPreview {...previewProps} type='team'/>
          )}
        />

        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => {
            return <TeamChanellList {...listProps} type='messaging'/>
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