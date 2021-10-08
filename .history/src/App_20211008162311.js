import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { Auth } from "./Auth.js";

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })
  }, []);

  return <ChakraProvider>{!session ? <Auth/> : <Account key={session.user.id} session={session} />}</ChakraProvider>;
}