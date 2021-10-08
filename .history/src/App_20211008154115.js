import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import { supabase } from "./supabaseClient";

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })
  }, []);

  return <ChakraProvider>{!sessions ? <Auth/> : <Account key={session}></Account>}</ChakraProvider>
}