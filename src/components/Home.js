// Importing Dependencies //
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//*import { Helmet } from 'react-helmet';

// Importing Logo Images SRC //
import CurieuxLogoPurple from '../content/images/logos/curieux-logo-purple.svg';


function Home() {
  return (
    <React.Fragment>

      {/* Changing Meta Data Dynamically */}
      {/*<Helmet>
          <title>Curieux - Make your music skilled! ⚡</title>
          <meta name="description" content="Make your music skilled! ⚡"></meta>
      </Helmet>*/}

      {/* Components */}
      <div className="home-content" id="home-content">
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
                    {/*<button class="home-box-button-btn" id="signupBtn"><Link to="/signup" className="home-box-button home-box-button-left link-white">Join!</Link></button>*/}
                    <button class="home-box-button-btn" id="signupBtn"><Link to="/signin" className="home-box-button home-box-button-right link-purple">Sign In!</Link></button>
                  </div>
            </div>
        </div>

        <div className="home-picture"></div>
      </div>
      
    </React.Fragment>
  );
}

export default Home;