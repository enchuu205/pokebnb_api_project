import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const validLogin = () => {
    // const login_button = document.getElementById('login-button')
    if (
      credential.length < 4 ||
      password.length < 6
    ) {
      // login_button.setAttribute("disabled", "");
      return true
    }
    // login_button.removeAttribute('disabled')
    return false
  }

  const demoUserLogin = () => {
    setCredential('DemoUser');
    setPassword('demopassword')
    handleSubmit()
  }

  return (
    <>

      <form onSubmit={handleSubmit} className='login-container'>
        <h1>Log In</h1>
        <label>
          <input
            className='login-input'
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder='Username or Email'
          />
        </label>
        <label>
          <input
            className='login-input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <button id='login-button' disabled={validLogin()} type="submit" className={`${validLogin() ? 'disable' : ''}`} >Log In</button>
        <button id='demo-user' onClick={demoUserLogin}>Log in as Demo User</button>
      </form>
    </>
  );
}

export default LoginFormModal;
