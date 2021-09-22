import React, {useEffect, useState} from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import { InviteIcon } from '../assets';

const ListContainer = ({children}) => {
  return (
    <div className="user-list__container">
      <div className="user-list__header">
        <p>
          User
        </p>
        <p>
          Invite
        </p>
      </div>
      {children}
    </div>
  )
}

const UserItem = ({user, setSelectedUsers, selectedUsers, createType, currentUser}) => {

  const selected = selectedUsers.includes(user.id);

  const handleSelect = () => {
    if(selected) {
      setSelectedUsers(prevUsers => prevUsers.filter(prev => prev !== user.id) )
    }
    else {
      if(createType === 'team') {
        setSelectedUsers(prevUsers => [...prevUsers, user.id])
      }
      else setSelectedUsers([currentUser, user.id])
    }
    console.log(selectedUsers);
  }

  return (
    <div 
      className="user-item__wrapper"
      onClick={handleSelect}>
      <div className="user-item__name-wrapper">
        <Avatar image={user.image} name={user.fullName || user.id} size={32} />
        <p className="user-item__name">{user.fullName || user.id}</p>
      </div>
      {
        selected ? 
        (
          <InviteIcon />
        )
        :
        <div className='user-item__invite-empty'/>
      }
    </div>
  )
}

const UserList = ({setSelectedUsers, selectedUsers, createType}) => {

  const {client} = useChatContext();

  const [error, setError] = useState(false)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [listEmpty, setListEmpty] = useState(false)

  useEffect(() => {

    const getUsers = async () => {
      if(loading) return;
      else {
        setLoading(true)
      }

      try {
        const response = await client.queryUsers(
          {
            id: {$ne: client.userID}
          },
          {
            id: 1
          },
          {
            limit: 8
          }
        );

        if(response.users.length) {
          setUsers(response.users)
          setListEmpty(false)
        }
        else {
          setListEmpty(true)
        }
      }
      catch(err) {
        setError(true)
      }
      setLoading(false)
    }

    if(client) getUsers();
    
  }, [])

  if(error) {
    return (
      <ListContainer>
        <div className="user-list__message">Error loading, please refresh and try again</div>
      </ListContainer>
      
    )
  }

  if(listEmpty) {
    return (
      <ListContainer>
        <div className="user-list__message">No Users Found</div>
      </ListContainer>
      
    )
  }

  return (
    <ListContainer>
      {
        loading ? 
        <div className="user-list__message">Loading User...</div>
        :
        (users.map((user, i) => (
          <UserItem 
            index={i} 
            key={user.id} 
            user={user}
            currentUser={client.userID}
            setSelectedUsers={setSelectedUsers} 
            selectedUsers={selectedUsers} 
            createType={createType} 
          />
        )))
      }
    </ListContainer>
  );
};

export default UserList;