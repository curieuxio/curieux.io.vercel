// Importing Dependencies //
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
// import { Helmet } from 'react-helmet';
import Link from 'react-scroll/modules/components/Link';
import { supabase } from '../supabase/supabaseClient';
import PersonalAvatar from './profile-content/personalAvatar';
import { Box, useColorModeValue, Button, Flex, FormControl, FormLabel, Input, Stack, Text, useToast } from '@chakra-ui/react';

// Importing Artist Card Icons Images SRC //
import SpotifyIcon from '../content/images/logos/musicServicesLogos/spotify-logo.svg';
import DeezerIcon from '../content/images/logos/musicServicesLogos/deezer-logo.svg';
import AppleMusicIcon from '../content/images/logos/musicServicesLogos/applemusic-logo.svg';
import TidalIcon from '../content/images/logos/musicServicesLogos/tidal-logo.svg';
import YoutubeIcon from '../content/images/logos/musicServicesLogos/youtube-logo.svg';
import AmazonIcon from '../content/images/logos/musicServicesLogos/amazon-logo.svg';
import WebsiteIcon from '../content/images/logos/musicServicesLogos/website-logo.svg';
import InstagramIcon from '../content/images/icons/social-icons/instagram-icon.svg';
import TwitterIcon from '../content/images/icons/social-icons/twitter-icon.svg';
import LinkIcon from '../content/images/icons/link-icon.svg';

// Importing Logo Images SRC //
import CurieuxWhiteLogo from '../content/images/logos/curieux-logo-white.svg';

// Profile Page //

const user = [
	{
		ArtistUsername: "blurblur",
    ArtistName: "blurblur",
    SpotifyUrl: "https://open.spotify.com/artist/75Up6LdWwOKmrHwDILwdwz",
    DeezerUrl: "https://www.deezer.com/fr/artist/15239255",
    AppleMusicUrl: "https://music.apple.com/en/artist/blurblur/1391996009",
    TidalUrl: "https://tidal.com/browse/artist/10688119",
    YoutubeUrl: "https://www.youtube.com/c/blurblur",
    AmazonUrl: "https://music.amazon.fr/artists/B07L3GX331/blurblur",
    WebsiteUrl: "",
	},

  {
		ArtistUsername: "theweeknd",
    ArtistName: "The Weeknd",
    SpotifyUrl: "https://open.spotify.com/artist/75Up6LdWwOKmrHwDILwdwz",
    DeezerUrl: "https://www.deezer.com/fr/artist/15239255",
    AppleMusicUrl: "https://music.apple.com/en/artist/blurblur/1391996009",
    TidalUrl: "https://tidal.com/browse/artist/10688119",
    YoutubeUrl: "https://www.youtube.com/c/blurblur",
    AmazonUrl: "https://music.amazon.fr/artists/B07L3GX331/blurblur",
    WebsiteUrl: "",
	}
];

export default function EditProfile() {

  const [ArtistName, setArtistName] = useState(null);
  const [ArtistUsername, setArtistUsername] = useState(null);
  const [SpotifyUrl, setSpotifyUrl] = useState(null);
  const [DeezerUrl, setDeezerUrl] = useState(null);
  const [AppleMusicUrl, setAppleMusicUrl] = useState(null);
  const [TidalUrl, setTidalUrl] = useState(null);
  const [YoutubeUrl, setYoutubeUrl] = useState(null);
  const [AmazonUrl, setAmazonUrl] = useState(null);
  const [WebSiteUrl, setWebSiteUrl] = useState(null);
  
	const [subdomain, setSubDomain] = useState(null);
	useEffect(() => {
		const host = window.location.host; // Gets the full domain of the app

		const arr = host
			.split(".")
			.slice(0, host.includes("localhost") ? -1 : -2);
		if (arr.length > 0) setSubDomain(arr[0]);
	}, []);


  async function getProfile() {
    try {
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`ArtistName, ArtistUsername, SpotifyUrl, DeezerUrl, AppleMusicUrl, TidalUrl, YoutubeUrl, AmazonUral, WebSiteUrl`)
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
      }
    } catch (error) {
      alert(error.message);
    } finally {
    }
  }
	
	const requestedUser = user.find((user) => user.ArtistUsername === subdomain);

	return (
    <section className="artistProfilePage">
      
      {subdomain ? (
              requestedUser ? (
                <div className="artistProfileBlock">

  

    {/* USER INFOS */}
    <div className="artistProfile">

      {/* ARTIST NAME INFORMATIONS */}

        {/* Artist Identity */}
        <section className="artistIdentity">

          <div className="artistPicture">

          </div>

          <h1 className="artistName">{requestedUser.ArtistName}</h1>
          <a className="pageSubtitle" href="" target="_blank">
            <h2 className="artistUsername">@{requestedUser.ArtistUsername}</h2>
            <img className="artistLinkLogo" src={LinkIcon}/>
          </a>
        </section>

        {/* Artist Links */}
        <section className="artistLinks">

          {/* Spotify Link */}
          <div className="linkBlock spotifyLinkBlock">
            <a href={requestedUser.SpotifyUrl} target="_blank">
              <div className="linkBlockTopContent">
                <img className="serviceLogo spotifyLogo" src={SpotifyIcon}/>
              </div>
              <div className="linkBlockBottomContent">
                <h3 className="serviceTitle">Listen</h3>
              </div>
            </a>
          </div>

          {/* Deezer Link */}
          <div className="linkBlock deezerLinkBlock">
            <a href={requestedUser.DeezerUrl} target="_blank">
              <div className="linkBlockTopContent">
                <img className="serviceLogo deezerLogo" src={DeezerIcon}/>
              </div>
              <div className="linkBlockBottomContent">
                <h3 className="serviceTitle">Listen</h3>
              </div>
            </a>
          </div>

          {/* AppleMusic Link */}
          <div className="linkBlock appleMusicLinkBlock">
            <a href={requestedUser.AppleMusicUrl} target="_blank">
              <div className="linkBlockTopContent">
                <img className="serviceLogo appleMusicLogo" src={AppleMusicIcon}/>
              </div>
              <div className="linkBlockBottomContent">
                <h3 className="serviceTitle">Listen</h3>
              </div>
            </a>
          </div>

          {/* Tidal Link */}
          <div className="linkBlock tidalLinkBlock">
            <a href={requestedUser.TidalUrl} target="_blank">
              <div className="linkBlockTopContent">
                <img className="serviceLogo tidalLogo" src={TidalIcon}/>
              </div>
              <div className="linkBlockBottomContent">
                <h3 className="serviceTitle">Listen</h3>
              </div>
            </a>
          </div>

          {/* Youtube Link */}
          <div className="linkBlock youtubeLinkBlock">
            <a href={requestedUser.YoutubeUrl} target="_blank">
              <div className="linkBlockTopContent">
                <img className="serviceLogo youtubeLogo" src={YoutubeIcon}/>
              </div>
              <div className="linkBlockBottomContent">
                <h3 className="serviceTitle">Listen</h3>
              </div>
            </a>
          </div>

          {/* Amazon Link */}
          <div className="linkBlock amazonLinkBlock">
            <a href={requestedUser.AmazonUrl} target="_blank">
              <div className="linkBlockTopContent">
                <img className="serviceLogo amazonLogo" src={AmazonIcon}/>
              </div>
              <div className="linkBlockBottomContent">
                <h3 className="serviceTitle">Listen</h3>
              </div>
            </a>
          </div>

          {/* Website Link */}
          <div className="linkBlock websiteLinkBlock">
            <a href={requestedUser.WebsiteUrl} target="_blank">
            <div className="linkBlockTopContent">
                <img className="serviceLogo websiteLogo" src={WebsiteIcon}/>
              </div>
              <div className="linkBlockBottomContent">
                <h3 className="serviceTitle">Website</h3>
              </div>
            </a>
          </div>

        </section>

      {/* FOOTER PART */}
      <div className="profileFooter">
        <a href="https://app.curieux.io" target="_blank"><img className="footerCurieuxLogo" src={CurieuxWhiteLogo}/></a>
        <p className="profile-footer-app-version">Bêta, version 0.1.0</p>
      </div>

    </div>
  </div>
                  
              ) : (
                <h1>Not Found</h1>
              )
            ) : (
              <div>
                {user.map((user) => (
                  <div>
                    <a
                      key={user.ArtistUsername}
                      href={
                        window.location.protocol +
                        "//" +
                        user.ArtistUsername +
                        "." +
                        window.location.host
                      }
                    >
                      {user.ArtistUsername}
                    </a>
                  </div>
                ))}
              </div>
            )}
      
    </section>
  );
}