import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useNavigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const navigate = useNavigate()

  const validSignUp = () => {
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      email.length < 4 ||
      username.length === 0 ||
      password.length < 6 ||
      confirmPassword.length === 0
    ) {
      return true
    }
    return false
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      navigate('/')
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  // validation template
  // { errors.firstName && <p>{errors.firstName}</p> }
  // { errors.lastName && <p>{errors.lastName}</p> }
  // { errors.email && <p>{errors.email}</p> }
  // { errors.username && <p>{errors.username}</p> }
  // { errors.password && <p>{errors.password}</p> }
  // { errors.confirmPassword && <p>{errors.confirmPassword}</p> }

  return (
    <>
      <form onSubmit={handleSubmit} className='signup-container'>
        <div className='signup-title'>Sign Up</div>
        {errors.firstName && <p>{errors.firstName}</p>}
        {errors.lastName && <p>{errors.lastName}</p>}
        {errors.email && <p>{errors.email}</p>}
        {errors.username && <p>{errors.username}</p>}
        {errors.password && <p>{errors.password}</p>}
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <label className='signup-input'>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder='First Name'
          />
        </label>
        <label className='signup-input'>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder='Last Name'
          />
        </label>
        <label className='signup-input'>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Email'
          />
        </label>
        <label className='signup-input'>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder='Username'
          />
        </label>
        <label className='signup-input'>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
          />
        </label>
        <label className='signup-input'>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder='Confirm Password'
          />
        </label>
        <button id='submit-button' disabled={validSignUp()} className={`${validSignUp() ? 'disable' : ''}`} type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;

// className={`${validSignUp() ? 'disabled' : null}`}
