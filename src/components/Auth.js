// Importing Dependencies //
import React, { Component, useState, useEffect, useContext, useCallback } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { BrowserRouter as Router, Route, Link, Links, Redirect, Switch } from 'react-router-dom';
import { Flex, Box, FormControl, FormLabel, Input, Stack, Button, Heading, Text, useColorModeValue, useToast } from '@chakra-ui/react';
import { CSSReset } from '@chakra-ui/css-reset';

// Importing Logo Images SRC //
import CurieuxLogoPurple from '../content/images/logos/curieux-logo-purple.svg';
import CurieuxLogoWhite from '../content/images/logos/curieux-logo-white.svg';

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
        <section className="home-content" id="home-content">
            <div className="home-box-left">
                <a href="/" className="home-box-logo"><img src={CurieuxLogoPurple}/></a>
                <div className="home-box-items">
                    <h1 className="home-box-title">
                        Make your profile
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
                        <a className="home-box-subtitle">Your music smart link, within 2 minutes!</a>
                    </div>
                    <form className="home-box-buttons-box" onSubmit={handleLogin}>
                        <div className="home-box-left-signup-box">
                            <input value={email} onChange={e => setEmail(e.target.value)} type="email" tabindex="-1" className="signin-up-input" required="required" placeholder="Enter you email"/>
                            <Button onClick={e => {e.preventDefault(); handleLogin(email);}} isLoading={loading} loadingText="Sending link..." style={{background: "#7b1df3", flexWrap: "nowrap", fontWeight: "700", borderRadius: 17 + "px", padding: '25px 25px', fontSize: 15 + "pt", width: 100+ "%", maxWidth: "fit-content"}} className="home-box-button home-box-button-left link-white"> {loading || 'SignUp or SignIn!'}</Button>{/* Start now for free! */}
                        </div>
                    </form>
                </div>
            </div>

            <div className="home-box-right">
                {/*<div className="sign-section-box shadow">
                    <img className="sign-form-logo" alt="Curieux logo" src={CurieuxLogoPurple}/>
                    <h1 className="sign-title">Sign In via magic link with your email! ✌️</h1>
                    <form className="form-section" onSubmit={handleLogin}>
                        <div className="inline-inputs">
                            <div className="inline-inputs-block-signin">
                                <label className="label-inputs" for="email">Email</label>
                                <input value={email} onChange={e => setEmail(e.target.value)} type="email" tabindex="-1" className="sign-inputs signin-inputs" required="required" placeholder="hello@curieux.io"/>
                            </div>
                            <Button className="button-purple" onClick={e => {e.preventDefault(); handleLogin(email);}} isLoading={loading} loadingText="Signing in..." style={{background: "#7000FF", fontWeight: "700", borderRadius: 12 + "px"}} className="sign-inputs-buttons"> {loading || 'Send magic link!'}</Button>
                        </div>
                    </form>
                </div>*/}
            </div>
        </section>

        {/* MAIN SECTION PART */}
        <section className="main-section">
                <div className="main-section-box-left">
                    <p className="main-section-box-title">Create & edit your page as you want!</p>
                    <p className="main-section-box-subtitle">And share it to the world!</p>
                    <form className="home-box-buttons-box home-box-buttons-box-cta" onSubmit={handleLogin}>
                        <div className="home-box-left-signup-box">
                            <input value={email} onChange={e => setEmail(e.target.value)} type="email" tabindex="-1" className="signin-up-input" required="required" placeholder="Enter you email"/>
                            <Button onClick={e => {e.preventDefault(); handleLogin(email);}} isLoading={loading} loadingText="Signing up..." style={{background: "#7b1df3", flexWrap: "nowrap", fontWeight: "700", borderRadius: 17 + "px", padding: '25px 25px', fontSize: 15 + "pt", width: 100+ "%", maxWidth: "fit-content"}} className="home-box-button home-box-button-left link-white"> {loading || 'Start now!'}</Button>{/* Start now for free! */}
                        </div>
                    </form>
                </div>
                <div className="main-section-box-right"></div>
        </section>

        {/* FOOTER PART */}
        <section className="home-footer">
            <div className="home-footer-informations">
                <div className="home-footer-column">
                    <a  href=""><img className="home-footer-logo" alt="Curieux Logo" src={CurieuxLogoWhite}/></a>
                </div>
                <div className="home-footer-column">
                    <h4 className="home-footer-column-title">Support</h4>
                    <a className="home-footer-column-text">This is an email</a>
                </div>
                <div className="home-footer-column">
                    <h4 className="home-footer-column-title">External Links</h4>
                    <a className="home-footer-column-text">This is a link</a>
                </div>
                <div className="home-footer-column">
                    <h4 className="home-footer-column-title">Site Map</h4>
                    <a className="home-footer-column-text">This is an anchor</a>
                </div>
            </div>

        </section>
    </Router>
            
    );
}