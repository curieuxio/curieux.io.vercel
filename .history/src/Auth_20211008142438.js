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
            const { error } = await supabase.auth.signIn({ email });
            if (error) throw error;
            toast({
                title: 'Account created',
                position: 'top',
                description: 'Check your email for the login link!',
                status: 'success',
                duration: 5000,
                isClosable: true
            })
        } catch (error) {
            toast({
                title: 'Error',
                position: 'top',
                description: 'Check your email for the login link!',
                status: 'success',
                duration: 5000,
                isClosable: true
            })
        }
    }
}