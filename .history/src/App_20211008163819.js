import './index.css';
import Auth from './Auth';
import Account from './Account';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { ChakraProvider } from '@chakra-ui/react';

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return <ChakraProvider>{!session ? <Auth /> : <Account key={session.user.id} session={session} />}</ChakraProvider>;
}