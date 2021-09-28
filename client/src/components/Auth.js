import React, {useContext, useState} from 'react';
import { login, signUp } from '../http/authAPI';
import Cookies from 'universal-cookie';
import AlertContext from '../context/AlertContext';

import signinImage from '../assets/signup.jpg'
import { ALERT_ERROR } from '../utils/consts';

const initialState = {
  fullName: '',
  userName: '',
  password: '',
  consfirmPassword: '',
  avatarURL: '',
  phoneNumber: '',
}

const Auth = () => {

  const setAlert = useContext(AlertContext)

  const [isSignup, setIsSignup] = useState(true)
  const [form, setForm] = useState(initialState)

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const switchMode = () => {
    setIsSignup((prev) => !prev)
  }
  
  const handleSumbit = async (e) => {
    e.preventDefault();
    const {userName, password, avatarURL, phoneNumber} = form;

    const cookies = new Cookies()
    
    try {
      const data = isSignup ? await signUp({fullName: form.fullName, userName, password, avatarURL, phoneNumber}) : await login({userName, password})

      const {token, userId, hashedPassword, fullName} = data;

      cookies.set('token', token, {path: '/', expires: new Date(Date.now()+86400000)})
      cookies.set('userId', userId, {path: '/', expires: new Date(Date.now()+86400000)})
      cookies.set('userName', userName, {path: '/', expires: new Date(Date.now()+86400000)})
      cookies.set('fullName', fullName, {path: '/', expires: new Date(Date.now()+86400000)})

      if(isSignup) {
        cookies.set('avatarURL', avatarURL, {path: '/', expires: new Date(Date.now()+86400000)})
        cookies.set('phoneNumber', phoneNumber, {path: '/', expires: new Date(Date.now()+86400000)})
        cookies.set('hashedPassword', hashedPassword, {path: '/', expires: new Date(Date.now()+86400000)})
      }

      window.location.reload();
    } catch (error) {
      setAlert({
        ...ALERT_ERROR,
        text: error.response.data.message || 'Unexpected error!',
        timer: 7000,
        open: true
      })
    }

    
  }
  

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>
            {
              isSignup ? "Sign Up" : "Sign In"
            }
          </p>
          <form onSubmit={handleSumbit}>
            {
              isSignup && (
                <div className="auth__form-container_fields-content_input">
                  <label htmlFor="fullName">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    name="fullName" 
                    placeholder="Enter Name" 
                    onChange={handleChange}
                    required
                  />
                </div>
              )
            }
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="fullName">
                User Name
              </label>
              <input 
                type="text" 
                name="userName" 
                placeholder="Enter User Name" 
                onChange={handleChange}
                required
              />
            </div>
            {
              isSignup && (
                <div className="auth__form-container_fields-content_input">
                  <label htmlFor="fullName">
                    Phone Number
                  </label>
                  <input 
                    type="text" 
                    name="phoneNumber" 
                    placeholder="Enter Phone" 
                    onChange={handleChange}
                    required
                  />
                </div>
              )
            }
            {
              isSignup && (
                <div className="auth__form-container_fields-content_input">
                  <label htmlFor="fullName">
                    Avatar URL
                  </label>
                  <input 
                    type="text" 
                    name="avatarURL" 
                    placeholder="Avatar URL" 
                    onChange={handleChange}
                  />
                </div>
              )
            }
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="fullName">
                Password
              </label>
              <input 
                type="password" 
                name="password" 
                placeholder="Enter Password" 
                onChange={handleChange}
                required
              />
            </div>
            {
              isSignup && (
                <div className="auth__form-container_fields-content_input">
                  <label htmlFor="fullName">
                    Confirm Password
                  </label>
                  <input 
                    type="password" 
                    name="confirmPassword" 
                    placeholder="Enter Password" 
                    onChange={handleChange}
                    required
                  />
                </div>
              )
            }
          <div className="auth__form-container_fields-content_button">
            <button
              type="submit"
            >
              {
                isSignup ? "Sign Up" : "Sign In"
              }
            </button>
          </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {
                isSignup ? "Already have an account?" : "Don't have an account?"
              }
              <span onClick={switchMode}>
                {
                  isSignup ? "Sign In" : "Sign Up"
                }
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={signinImage} alt="sign in" />
      </div>
    </div>
  );
};

export default Auth;