import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';

import { useContext } from 'react';
import { ManageContext } from '../../context/Manage';

import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const { setManage } = useContext(ManageContext)

  return (
    <>
      <div id='navigation-elements'>
        <NavLink to="/" className='logo' onClick={() => setManage(false)}>
          <img id='logo-image' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png' />
          <span className='logo-text'>Pokebnb</span>
        </NavLink>
        {isLoaded && (
          <div >
            <ProfileButton user={sessionUser} />
          </div>
        )}
      </div>
      <hr></hr>

    </>
  );
}

export default Navigation;
