// Importing Dependencies //
import React, { Component, useState, useEffect, useContext, useCallback } from 'react';
// import { Helmet } from 'react-helmet';
import { supabase } from '../supabase/supabaseClient';
import { BrowserRouter as Router, Route, Links, Redirect, Switch } from 'react-router-dom';
import { Flex, Box, FormControl, FormLabel, Input, Stack, Button, Heading, Text, useColorModeValue, useToast } from '@chakra-ui/react';
import { Link } from 'react-scroll';

// Importing Logo Images SRC //
import CurieuxLogoPurple from '../content/images/logos/curieux-logo-purple.svg';
import CurieuxLogoWhite from '../content/images/logos/curieux-logo-white.svg';

// Importing Icon Images SRC //
import InstagramIcon from '../content/images/icons/social-icons/instagram-white-icon.svg';
import TwitterIcon from '../content/images/icons/social-icons/twitter-white-icon.svg';
import SpotifyIcon from '../content/images/icons/social-icons/spotify-white-icon.svg';

// Importing Icon Images SRC //
import CloseBtn from '../content/images/icons/close.svg';

export default function Auth() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();

    const handleLogin = async email => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signIn({ email });
            if (error) throw error;
            toast({
                title: 'Success! 🤟',
                position: 'top',
                description: 'Check your email for the login link! It may arrive in your spams & promotions tabs!',
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
                background: 'blue',
                isClosable: true
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        
        <Router>
        
        {/* Changing Meta Data Dynamically 
        <Helmet>
            <title>Curieux - Your artist profile in 2 minutes! ⚡</title>
            <meta name="description" content="Your artist profile in 2 minutes! ⚡"></meta>
        </Helmet>*/}

        {/* Home Component */}
        <section className="home-content" id="signup">
            <div className="home-box-left">
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
                        <a className="home-box-subtitle">Your music smart link, 100% free!</a> {/* within 2 minutes! */}
                    </div>
                    <form className="home-box-buttons-box" onSubmit={handleLogin}>
                        <div className="home-box-left-signup-box">
                            <input value={email} onChange={e => setEmail(e.target.value)} type="text" name="email" tabindex="-1" className="signin-up-input" required="required" placeholder="Enter you email"/>
                            {/*<input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" tabindex="-1" className="signin-up-input" required="required" placeholder="Password"/>*/}
                            <Button onClick={e => {e.preventDefault(); handleLogin(email);}} isLoading={loading} loadingText="Sending link..." style={{background: "#7b1df3", webkitAppearance: "none", flexWrap: "nowrap", fontWeight: "700", borderRadius: 22 + "px", padding: '30px', fontSize: 18.75 + "pt", width: 100+ "%", minWidth: "fit-content", display: "flex", alignItems: "center"}} className="home-box-button home-box-button-left link-white"> {loading || 'Sign Up or Sign In!'}</Button>{/* Start now for free! */}
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
        {/*<section className="bullet-points-section">

        </section> */}  

        <section className="cta-section">
                <div className="cta-section-box-left">
                    <p className="cta-section-box-title">Create & edit your page as you want!</p>
                    <p className="cta-section-box-subtitle">And share it to the world!</p>
                    <form className="home-box-buttons-box-cta-section home-box-buttons-box-cta" onSubmit={handleLogin}>
                        <div className="home-box-left-signup-box">
                            <input value={email} onChange={e => setEmail(e.target.value)} type="text" name="email" tabindex="-1" className="signin-up-input-cta" required="required" placeholder="Enter you email"/>
                            <Button onClick={e => {e.preventDefault(); handleLogin(email);}} isLoading={loading} loadingText="Signing up..." style={{background: "#7b1df3", webkitAppearance: "none", flexWrap: "nowrap", fontWeight: "700", borderRadius: 22 + "px", padding: '30px 30px', fontSize: 18.75 + "pt", width: 100+ "%", maxWidth: "fit-content", display: "flex", alignItems: "center"}} className="home-box-button-cta home-box-button-left link-white"> {loading || 'Start now!'}</Button>{/* Start now for free! */}
                        </div>
                    </form>
                </div>
                <div className="cta-section-box-right"></div>
        </section>

        {/* FOOTER PART */}
        <section className="home-footer">
            <div className="home-footer-informations">
                <div className="home-footer-top-informations">
                    <div className="home-footer-top-informations-left-box">
                        <h3 className="home-footer-main-title">Ready to make your music skilled?</h3>
                        <p className="home-footer-main-subtitle">Join Curieux for free and promote your music to your fans with only one link!</p>
                    </div>
                    <div className="home-footer-top-informations-right-box"> {/* onClick={(e) => {e.preventDefault(); window.location.href='#signup';}} */}
                            <Link to="signup" smooth={true} duration={500}><Button type="button"  style={{marginLeft: "auto", webkitAppearance: "none", background: "#ffffff1a", color: "white", flexWrap: "nowrap", fontWeight: "700", maxWidth: "max-content", borderRadius: 22 + "px", padding: '31px 31px', fontSize: 18.5 + "pt", width: 100+ "%", display: "flex", alignItems: "center"}} className="home-footer-cta-button">Start now for free!</Button></Link>
                    </div>
                </div>
                <div className="home-footer-bottom-informations">
                    <div className="home-footer-column">
                        <a className="home-footer-logo-box" href=""><img className="home-footer-logo" alt="Curieux Logo" src={CurieuxLogoWhite}/></a>
                        <div className="home-footer-socials-box">
                            <a className="home-footer-social-button" href="https://instagram.com/curieux.io" target="_blank"><img className="home-footer-social-icon" alt="Instagram Icon" src={InstagramIcon}/></a>
                            <a className="home-footer-social-button" href="https://twitter.com/curieuxio" target="_blank"><img className="home-footer-social-icon" alt="Instagram Icon" src={TwitterIcon}/></a>
                            <a className="home-footer-social-button" href="https://open.spotify.com/user/k6zri3sdtajjdjmiy669lvhtj" target="_blank"><img className="home-footer-social-icon" alt="Instagram Icon" src={SpotifyIcon}/></a>
                        </div>
                    </div>
                    <div className="home-footer-column">
                        <h4 className="home-footer-column-title">Support</h4>
                        <a href="mailto:hello@curieux.io" className="home-footer-column-text">hello@curieux.io</a>
                        <a href="https://m.me/curieux.io" target="_blank" className="home-footer-column-text">Messenger</a>
                        <a href="https://drift.me/curieux.io" target="_blank" className="home-footer-column-text">Drift chat</a>
                    </div>
                    <div className="home-footer-column">
                        <h4 className="home-footer-column-title">External Links</h4>
                        <a href="https://open.spotify.com/user/k6zri3sdtajjdjmiy669lvhtj" target="_blank" className="home-footer-column-text">Spotify</a>
                        <a href="https://instagram.com/curieux.io" target="_blank" className="home-footer-column-text">Instagram</a>
                        <a href="https://twitter.com/curieux.io" target="_blank" className="home-footer-column-text">Twitter</a>
                    </div>
                    <div className="home-footer-column">
                        <h4 className="home-footer-column-title">Site Map</h4>
                        <Link to="signup" smooth={true} duration={500} className="home-footer-column-text">Home</Link>
                    </div>
                </div>
                <h6 className="home-footer-copyright">© Curieux, 2021</h6>
            </div>

        </section>
    </Router>
            
    );
}