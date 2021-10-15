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
                title: 'Success! 🤟',
                position: 'top',
                description: 'Check your email for the login link!',
                status: 'success',
                duration: 5000,
                isClosable: true
            })
        } catch (error) {
            toast({
                title: 'Error 😥',
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

        {/* Home Component */}
        <section className="home-content sign-home-content" id="home-content">
            <div className="home-box">
                <a href="/" className="home-box-logo"><img src={CurieuxLogoPurple}/></a>
                <div className="home-box-items">
                    <h1 className="home-box-title">
                        Make your music
                        <div className="ms-slider">
                        <ul className="ms-slider__words">
                            <li className="ms-slider__word"><span className="home-box-title-slider-word">skilled</span>! ⚡</li>
                            <li className="ms-slider__word"><span className="home-box-title-slider-word">elegant</span>! ✨</li>
                            <li className="ms-slider__word"><span className="home-box-title-slider-word">unique</span>! 🦄</li>
                            <li className="ms-slider__word"><span className="home-box-title-slider-word">skilled</span>! ⚡</li>
                        </ul>
                        </div>
                    </h1>
                    <div className="home-box-subtitle-box">
                        <a className="home-box-subtitle">Audio-visual production & creation, because we care about your music.</a>
                    </div>
                    <div className="home-box-buttons-box">
                        <button class="home-box-button-btn" id="signupBtn"><Link to="/signup" className="home-box-button home-box-button-left link-white">Join!</Link></button>
                        <button class="home-box-button-btn" id="signupBtn"><Link to="/signin" className="home-box-button home-box-button-right link-purple">Sign In!</Link></button>
                    </div>
                </div>
            </div>

            <div className="home-picture">
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
                                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" tabindex="-1"className="sign-inputs signin-inputs" required="required" placeholder="hello@curieux.io"/>
                                </div>
                                <Button className="button-purple" onClick={e => {e.preventDefault(); handleLogin(email);}} isLoading={loading} loadingText="Signing in ..." style={{background: "#7000FF", fontWeight: "700", borderRadius: 12 + "px"}} className="sign-inputs-buttons"> {loading || 'Send magic link'}</Button>
                            </div>
                        </form>
                    </div>
                    {/*<Link to="/"><img className="sign-section-close-button" alt="close" src={CloseBtn}/></Link>*/}

                </div>
            </div>
        </section>

        {/* Auth BG Blurred Div */}
        <div className="sign-section-background-wrapper"></div>

        {/* Auth Component */}
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
                                <input value={email} onChange={e => setEmail(e.target.value)} type="email" tabindex="-1"className="sign-inputs signin-inputs" required="required" placeholder="hello@curieux.io"/>
                            </div>
                            <Button className="button-purple" onClick={e => {e.preventDefault(); handleLogin(email);}} isLoading={loading} loadingText="Signing in ..." style={{background: "#7000FF", fontWeight: "700", borderRadius: 12 + "px"}} className="sign-inputs-buttons"> {loading || 'Send magic link'}</Button>
                        </div>
                    </form>
                </div>

                {/*  Right Part */}
                <div className="sign-section-right">
                    <div className="sign-section-right-content"></div>
                </div>  
                {/*<Link to="/"><img className="sign-section-close-button" alt="close" src={CloseBtn}/></Link>*/}
                
            </div>
        </section>
    </Router>
            
    );
}