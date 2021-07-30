import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Auth from '.';
import { SetErrors } from '../../store/errors';
import { SignUp } from '../../store/session';
import AuthInput from './AuthInput';

export default function SignupForm () {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const onSubmit = () => {
    if (password === repeatPassword) dispatch(SignUp(username, email, password));
    else dispatch(SetErrors(['Passwords do not match']));
  };

  return (
    <Auth onSubmit={onSubmit}>
      <AuthInput
        type='username'
        onChangeText={setUsername}
        value={username}
      />
      <AuthInput
        type='email'
        onChangeText={setEmail}
        value={email}
      />
      <AuthInput
        type='password'
        onChangeText={setPassword}
        value={password}
      />
      <AuthInput
        type='repeat-password'
        onChangeText={setRepeatPassword}
        value={repeatPassword}
      />
      <button className='auth-button'>
        Sign Up
      </button>
    </Auth>
  );
}
