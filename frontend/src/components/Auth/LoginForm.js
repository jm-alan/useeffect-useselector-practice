import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Auth from '.';
import { LogIn } from '../../store/session';
import AuthInput from './AuthInput';

export default function LoginForm () {
  const dispatch = useDispatch();

  const [identification, setIdentification] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    console.log('login attempted');
    dispatch(LogIn(identification, password));
  };

  return (
    <Auth onSubmit={onSubmit}>
      <AuthInput
        type='identification'
        onChangeText={setIdentification}
        value={identification}
      />
      <AuthInput
        type='password'
        onChangeText={setPassword}
        value={password}
      />
      <button className='auth-button'>
        Log In
      </button>
    </Auth>
  );
}
