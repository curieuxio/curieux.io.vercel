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
import EditProfile from './components/EditProfile';
import PublicProfile from './components/PublicProfile';


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
        
        <EditProfile/>

      </Switch>
    </Router>
  </div>;
}