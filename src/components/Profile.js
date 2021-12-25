// Importing Dependencies //
import { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet';
import Link from 'react-scroll/modules/components/Link';
import { supabase } from '../supabase/supabaseClient';
import PersonalAvatar from './profile-content/personalAvatar';
import { Box, useColorModeValue, Button, Flex, FormControl, FormLabel, Input, Stack, Text, useToast } from '@chakra-ui/react';

// Importing Artist Card Icons Images SRC //
import ArtistProfileIcon from '../content/images/icons/profile-icon.svg';
import SpotifyIcon from '../content/images/icons/social-icons/spotify-icon.svg';
import AppleMusicIcon from '../content/images/icons/social-icons/applemusic-icon.svg';
import DeezerIcon from '../content/images/icons/social-icons/deezer-icon.svg';
import InstagramIcon from '../content/images/icons/social-icons/instagram-icon.svg';
import TwitterIcon from '../content/images/icons/social-icons/twitter-icon.svg';
import LinkIcon from '../content/images/icons/link-icon.svg';

// Importing User Avatar //
import { Avatar } from '@chakra-ui/react';

// Importing Logo Images SRC //
import HeaderLogo from '../content/images/logos/curieux-logo-white.svg';

// Importing Header Icons Images SRC //
import DashboardIcon from '../content/images/icons/dashboard.svg';
import ProfileIcon from '../content/images/icons/profile.svg';
import WalletIcon from '../content/images/icons/wallet.svg';
import SettingsIcon from '../content/images/icons/settings.svg';

// Profile Page //
export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [ArtistName, setArtistName] = useState(null);
  const [ArtistUsername, setArtistUsername] = useState(null);
  const [SpotifyUrl, setSpotifyUrl] = useState(null);
  const [DeezerUrl, setDeezerUrl] = useState(null);
  const [AppleMusicUrl, setAppleMusicUrl] = useState(null);
  const [WebSiteUrl, setWebSiteUrl] = useState(null);
  const [AvatarUrl, setAvatarUrl] = useState(null);
  const toast = useToast();

  // Update Email //
  //const { user, error } = await supabase.auth.update({email: 'new@email.com'})

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`ArtistName, ArtistUsername, SpotifyUrl, DeezerUrl, AppleMusicUrl, WebSiteUrl, AvatarUrl`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setArtistName(data.ArtistName);
        setArtistUsername(data.ArtistUsername);
        setSpotifyUrl(data.SpotifyUrl);
        setDeezerUrl(data.DeezerUrl);
        setAppleMusicUrl(data.AppleMusicUrl);
        setWebSiteUrl(data.WebSiteUrl);
        setAvatarUrl(data.AvatarUrl);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ ArtistName, ArtistUsername, SpotifyUrl, DeezerUrl, AppleMusicUrl, WebSiteUrl, AvatarUrl }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        ArtistName,
        ArtistUsername,
        SpotifyUrl,
        AppleMusicUrl,
        DeezerUrl,
        WebSiteUrl,
        AvatarUrl,
        updated_at: new Date()
      };

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal' // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
      toast({
        title: 'Profile updated! 🤟',
        position: 'top',
        variant: 'subtle',
        description: '',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (

    <section className="artist-profile-page">

      {/* Header Wrapper Part */}

      {/*<section className="header">

        <div className="header-top-informations">
            <Link to="/studio/dashboard"><img className="header-logo" src={HeaderLogo} alt="Curieux logo"/></Link>
            <a className="header-user-name">Hello {ArtistUsername} !</a>
        </div>

        <div className="header-menu">
            <div className="header-menu-content">   
                <Link to="/studio/dashboard">
                    <div className="header-menu-button-div" id="dashboardBtn">
                        <img className="header-menu-button" id="dashboardBtn-img" src={DashboardIcon} alt="Dashboard Icon"/>
                        <a className="header-menu-button-text" id="dashboardBtn-text">Dashboard</a>
                    </div>
                </Link>

                <Link to="/studio/profile">
                    <div className="header-menu-button-div" id="profileBtn">
                        <img className="header-menu-button" id="profileBtn-img" src={ProfileIcon} alt="Profile Icon"/>
                        <a className="header-menu-button-text" id="profileBtn-text">Profile</a>
                    </div>
                </Link>

                <Link to="/studio/wallet">
                    <div className="header-menu-button-div" id="walletBtn">
                        <img className="header-menu-button" id="walletBtn-img" src={WalletIcon} alt="Wallet Icon"/>
                        <a className="header-menu-button-text" id="walletBtn-text">Wallet</a>
                    </div>
                </Link>
                
                <Link to="/studio/settings">
                    <div className="header-menu-button-div" id="settingsBtn">
                        <img className="header-menu-button" id="settingsBtn-img" src={SettingsIcon} alt="Settings Icon"/>
                        <a className="header-menu-button-text" id="settingsBtn-text">Settings</a>
                    </div>
                </Link>
            </div>

        </div>

        </section>*/}

      {/* Changing Meta Data Dynamically
      <Helmet>
        <title>Profile! ⚡</title>
        <meta name="description" content="Edit your artist profile! ⚡"></meta>
      </Helmet>*/}

      <div className="artist-profile-section">

        {/* Form Informations */}
        <div className="artist-profile-block"
          maxW={'445px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}
          justifyItems={'center'}
          justifyContent={'center'}>

          <div className="profile-user">
            <PersonalAvatar
              url={AvatarUrl}
              onUpload={url => {
                setAvatarUrl(url);
                updateProfile({ ArtistName, ArtistUsername, SpotifyUrl, DeezerUrl, AppleMusicUrl, WebSiteUrl, AvatarUrl: url });
              }}
            />
          </div>

          {/* USER INFOS */}
          <div className="artist-profile-block-content">

            {/* USER MAIN INFOS */}
            <h1 className="profile-user-logged-as">You are logged as</h1>
            <h2 className="profile-user-email">{session.user.email}</h2>

            {/* ARTIST NAME INFORMATIONS */}
            <div className="artist-name-informations">
              {/* Artist Name */}
              <div className="link-input">
                <p className="form-input-category">Artist Name</p>
                <div className="artist-card-socials-block">
                  <a><img className="artist-card-socials-icons" src={ArtistProfileIcon} alt="Link Logo" /></a>
                  <input className="profile-link-input"
                    type={'text'}
                    value={ArtistName || ''}
                    onChange={e => setArtistName(e.target.value)}
                    placeholder={ArtistName || 'Name'}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    bg={useColorModeValue('gray.100', 'gray.600')}
                    rounded={'full'}
                    border={0}

                    _focus={{
                      bg: useColorModeValue('gray.200', 'gray.800'),
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Artist Username */}
              <div className="link-input">
                <p className="form-input-category">Username</p>
                <div className="artist-card-socials-block">
                  <a href={ArtistUsername} target="_blank" className="artist-card-socials-icons-a"><img className="artist-card-socials-icons" src={LinkIcon} alt="Link Logo" /></a>
                  <input className="profile-link-input"
                    type={'text'}
                    value={ArtistUsername || ''}
                    onChange={e => setArtistUsername(e.target.value)}
                    placeholder={ArtistUsername || 'Username'}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    bg={useColorModeValue('gray.100', 'gray.600')}
                    rounded={'full'}
                    border={0}

                    _focus={{
                      bg: useColorModeValue('gray.200', 'gray.800'),
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            </div>


            {/* ARTIST LINKS */}
            <div className="artist-links-block">

              {/* Spotify Link */}
              <div className="link-input">
                <p className="form-input-category">Spotify</p>
                <div className="artist-card-socials-block">
                  <a href={SpotifyUrl} target="_blank" className="artist-card-socials-icons-a"><img className="artist-card-socials-icons" src={SpotifyIcon} alt="Spotify Logo" /></a>
                  <input className="profile-link-input"
                    type={'text'}
                    value={SpotifyUrl || ''}
                    onChange={e => setSpotifyUrl(e.target.value)}
                    placeholder={SpotifyUrl || 'https://open.spotify.com'}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    bg={useColorModeValue('gray.100', 'gray.600')}
                    rounded={'full'}
                    border={0}

                    _focus={{
                      bg: useColorModeValue('gray.200', 'gray.800'),
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Deezer Link */}
              <div className="link-input">
                <p className="form-input-category">Deezer</p>
                <div className="artist-card-socials-block">
                  <a href={DeezerUrl} target="_blank" className="artist-card-socials-icons-a"><img className="artist-card-socials-icons" src={DeezerIcon} alt="Deezer Logo" /></a>
                  <input className="profile-link-input"
                    type={'text'}
                    value={DeezerUrl || ''}
                    onChange={e => setDeezerUrl(e.target.value)}
                    placeholder={DeezerUrl || 'https://deezer.com'}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    bg={useColorModeValue('gray.100', 'gray.600')}
                    rounded={'full'}
                    border={0}

                    _focus={{
                      bg: useColorModeValue('gray.200', 'gray.800'),
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Apple Music Link */}
              <div className="link-input">
                <p className="form-input-category">Apple Music</p>
                <div className="artist-card-socials-block">
                  <a href={AppleMusicUrl} target="_blank" className="artist-card-socials-icons-a"><img className="artist-card-socials-icons artist-card-socials-icons-apple" src={AppleMusicIcon} alt="Apple Music Logo" /></a>
                  <input className="profile-link-input"
                    type={'text'}
                    value={AppleMusicUrl || ''}
                    onChange={e => setAppleMusicUrl(e.target.value)}
                    placeholder={AppleMusicUrl || 'https://music.apple.com'}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    bg={useColorModeValue('gray.100', 'gray.600')}
                    rounded={'full'}
                    border={0}

                    _focus={{
                      bg: useColorModeValue('gray.200', 'gray.800'),
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* WebSite Link */}
              <div className="link-input">
                <p className="form-input-category">Web Site</p>
                <div className="artist-card-socials-block">
                  <a href={WebSiteUrl} target="_blank" className="artist-card-socials-icons-a"><img className="artist-card-socials-icons" src={LinkIcon} alt="Link Logo" /></a>
                  <input className="profile-link-input"
                    type={'text'}
                    value={WebSiteUrl || ''}
                    onChange={e => setWebSiteUrl(e.target.value)}
                    placeholder={WebSiteUrl || 'https://artistwebsite.com'}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    bg={useColorModeValue('gray.100', 'gray.600')}
                    rounded={'full'}
                    border={0}

                    _focus={{
                      bg: useColorModeValue('gray.200', 'gray.800'),
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Buttons Part */}
            <div className="profile-bottom-buttons">

              {/* Update Button */}
              <button className="button-purple update-profile-button"
                isLoading={loading}
                loadingText="Updating ..."
                onClick={() => updateProfile({ ArtistName, ArtistUsername, SpotifyUrl, DeezerUrl, AppleMusicUrl, WebSiteUrl, AvatarUrl })}
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                bg={'#7000FF'}
                color={'white'}
                boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}

                _hover={{
                  bg: '#5800CC'
                }}

                _focus={{
                  bg: '#5800CC'
                }}>

                {loading ? 'Updating...' : 'Update'}
              </button>

              {/* Logout Button */}
              <button className="button-grey logout-button"
                onClick={() => supabase.auth.signOut()}
                flex={1}
                fontSize={'sm'}
                rounded={'full'}

                _focus={{
                  bg: 'gray.200'
                }}>

                Logout
              </button>
            </div>

            {/* FOOTER PART */}
            <div className="profile-footer">
              <p className="profile-footer-app-version">Bêta, version 0.1.0</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}