import { useState } from "@chakra-ui/react";
import { useToast } from "react";
import { supabase } from "./supabaseClient";

export default function Auth() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const toast = useToast();

    const handleLogin = async email => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signIn({ email })
        } catch (error) {

        }
    }
}