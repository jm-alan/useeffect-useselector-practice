import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import NavBar from './components/NavBar';
import Posts from './components/Posts';
import csrfetch from './store/csrfetch';
import { RestoreUser } from './store/session';

export default function App () {
  const dispatch = useDispatch();

  const loaded = useSelector(state => state.session.loaded);

  useEffect(() => {
    csrfetch.captureDispatch(dispatch);
    csrfetch.restoreCSRF();
    dispatch(RestoreUser());
  }, [dispatch]);

  return loaded && (
    <>
      <NavBar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/posts'>
          <Posts />
        </Route>
        <Route exact path='/posts/:postId'>
          <Posts />
        </Route>
      </Switch>
    </>
  );
}
