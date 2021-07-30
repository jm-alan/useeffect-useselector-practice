import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SetModal } from '../../store/modal';
import { LogOut } from '../../store/session';
import { ShowModal } from '../../store/UX';

import LoginForm from '../Auth/LoginForm';
import SignupForm from '../Auth/SignupForm';

export default function NavBar () {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  const popLogin = () => {
    dispatch(SetModal(LoginForm));
    dispatch(ShowModal());
  };

  const popSignup = () => {
    dispatch(SetModal(SignupForm));
    dispatch(ShowModal());
  };

  const logOut = () => dispatch(LogOut());

  return (
    <nav>
      {user
        ? (
          <>
            <Link to='/'>
              Home
            </Link>
            <Link to='/users/me/'>
              My Profile
            </Link>
            <button onClick={logOut}>
              Log Out
            </button>
          </>
          )
        : (
          <>
            <button onClick={popLogin}>
              Log In
            </button>
            <button onClick={popSignup}>
              Sign Up
            </button>
          </>
          )}
    </nav>
  );
}
