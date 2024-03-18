import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      <div id='user-button'>
        <NavLink to="/">
          <img id='navigation-logo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOyo98eJP6sqYgyRyB_tEqYnnZB2QPJuqVBB4g8cnPsA&s' />
          Pokebnb
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
