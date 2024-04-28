import { useState, useEffect, useRef, useContext } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useNavigate } from 'react-router-dom';
import './ProfileButton.css'

import { ManageContext } from '../../context/Manage';

import { BsList } from "react-icons/bs";

function ProfileButton({ user }) {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  const { setManage } = useContext(ManageContext)

  function createSpotButton() {
    setManage(false)
    navigate('/spots/new')
  }

  function manageSpots() {
    setManage(true)
    navigate('/')
  }

  function manageReviews() {
    setManage(true)
    navigate('/')
  }

  return (
    <>
      <div className='user-container'>
        {user ? (<div id='create-spot-button' onClick={() => createSpotButton()}>Create a New Spot</div>) : null}
        <button className='user-button' onClick={toggleMenu}>
          <BsList className='bar-icon' />
          <i className="fas fa-user-circle" />
        </button>
      </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div>Hello, {user.firstName}</div>
            <div>{user.email}</div>
            <hr />
            <div onClick={() => manageSpots()} className='manage-text'>Manage Spots</div>
            <div onClick={() => manageReviews()} className='manage-text'>Manage Reviews</div>
            <div className='button-container'>
              <button className='logout-button' onClick={logout}>Log Out</button>
            </div>
          </>
        ) : (
          <span className='user-button-popup'>
            <OpenModalMenuItem
              itemText="Sign up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            <OpenModalMenuItem
              itemText="Log in"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
          </span>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
