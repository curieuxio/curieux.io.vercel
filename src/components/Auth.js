// Importing Dependencies //
import React, { Component, useState, useEffect, useContext, useCallback } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { BrowserRouter as Router, Route, Link, Links, Redirect, Switch } from 'react-router-dom';
import { Flex, Box, FormControl, FormLabel, Input, Stack, Button, Heading, Text, useColorModeValue, useToast } from '@chakra-ui/react';

// Importing Logo Images SRC //
import CurieuxLogoPurple from '../content/images/logos/curieux-logo-purple.svg';

// Importing Icon Images SRC //
import CloseBtn from '../content/images/icons/close.svg';

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
                title: 'Success!',
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
                description: error.error_description || error.message,
                status: 'success',
                duration: 5000,
                isClosable: true
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        
        <Router>
        <section className="sign-section-wrapper">
        <div className="sign-section shadow" id="sign-section">

            {/*  Left Part */}
            <div className="sign-section-left">

                {/*  Intro Part */}
                <img className="sign-form-logo" alt="Curieux logo" src={CurieuxLogoPurple}/>
                <h1 className="sign-title">Sign In via magic link with your email! ✌️</h1>
                
                {/*  Form Part */}
                <form className="form-section" onSubmit={handleLogin}>
                    <div className="inline-inputs">
                        <div className="inline-inputs-block-signin">
                            <label className="label-inputs" for="email">Email</label>
                            <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="sign-inputs signin-inputs" required="required" placeholder="hello@curieux.io"/>
                        </div>
                        <Button className="button-purple" onClick={e => {e.preventDefault(); handleLogin(email);}} isLoading={loading} loadingText="Signing in ..." style={{background: "#7000FF", fontWeight: "700", borderRadius: 12 + "px"}} className="sign-inputs-buttons"> {loading || 'Send magic link'}</Button>
                    </div>
                </form>
            </div>

            {/*  Right Part */}
            <div className="sign-section-right">
                <div className="sign-section-right-content"></div>
            </div>  
            <Link to="/"><img className="sign-section-close-button" alt="close" src={CloseBtn}/></Link>
            
        </div>
    </section>
    </Router>
            
    );
}