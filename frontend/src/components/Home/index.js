import { useSelector } from 'react-redux';

export default function Home () {
  const user = useSelector(state => state.session.user);

  return user
    ? (
      <h1>
        Hello, {user.username}!
      </h1>
      )
    : (
      <h1>
        Hello! Please either log in or sign up!
      </h1>
      );
}
