import React from 'react';
import HospitalIcon from '../assets/hospital.png'
import LogoutIcon from '../assets/logout.png'
import Cookies from 'universal-cookie';

const SideBar = () => {

  const cookies = new Cookies();

  const logout = () => {
    cookies.remove('userId');
    cookies.remove('userName');
    cookies.remove('fullName');
    cookies.remove('avatarURL');
    cookies.remove('phoneNumber');
    cookies.remove('hashedPassword');
    cookies.remove('token');

    window.location.reload();
  }

  return (
    <div className="channel-list__sidebar">
      <div className="channel-list__sidebar__icon1">
        <div className="icon1__inner">
          <img src={HospitalIcon} alt="HospitalIcon" width={30} />
        </div>
      </div>
      <div className="channel-list__sidebar__icon2">
        <div 
          className="icon1__inner"
          onClick={logout}>
          <img src={LogoutIcon} alt="Logout" width={30} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;