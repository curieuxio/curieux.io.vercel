// Importing Dependencies //
import { useState, useEffect } from 'react';
import { supabase } from './supabase/supabaseClient';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Links, Redirect, Switch } from 'react-router-dom';

// Importing Styles //
import './content/css/reset.css';
import './content/css/app.css';

// Importing Components //
import Auth from './components/Auth';
import Home from './components/Home';
import Profile from './components/Profile';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return <div className="App" onContextMenu={(e)=> e.preventDefault()}>
    <Router>
      <Switch>
        {/*<Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Auth} />
        <Route exact path="/profile" component={Profile} />*/}
        <ChakraProvider>{!session ? <Auth /> : <Profile key={session.user.id} session={session} />}</ChakraProvider>
      </Switch>
    </Router>
  </div>;
}