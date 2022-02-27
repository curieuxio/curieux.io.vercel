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
import CurieuxPurpleLogo from '../content/images/logos/curieux-logo-purple.svg';

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
	}
];

export default function EditProfile() {
  
	const [subdomain, setSubDomain] = useState(null);
	useEffect(() => {
		const host = window.location.host; // gets the full domain of the app

		const arr = host
			.split(".")
			.slice(0, host.includes("localhost") ? -1 : -2);
		if (arr.length > 0) setSubDomain(arr[0]);
	}, []);

	const requestedUser = user.find((user) => user.ArtistUsername === subdomain);
	
	return (
    <section className="artist-profile-page">
      
      {subdomain ? (
              requestedUser ? (
                <div className="artist-profile-section">

  

    {/* USER INFOS */}
    <div className="artist-profile-block-content">

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
              <img className="serviceLogo" src={SpotifyIcon}/>
              <h3 className="serviceTitle">Spotify</h3>
            </a>
          </div>

          {/* Deezer Link */}
          <div className="linkBlock deezerLinkBlock">
            <a href={requestedUser.DeezerUrl} target="_blank">
              <img className="serviceLogo" src={DeezerIcon}/>
              <h3 className="serviceTitle">Apple Music</h3>
            </a>
          </div>

          {/* AppleMusic Link */}
          <div className="linkBlock appleMusicLinkBlock">
            <a href={requestedUser.AppleMusicUrl} target="_blank">
              <img className="serviceLogo" src={AppleMusicIcon}/>
              <h3 className="serviceTitle">Apple Music</h3>
            </a>
          </div>

          {/* Tidal Link */}
          <div className="linkBlock tidalLinkBlock">
            <a href={requestedUser.TidalUrl} target="_blank">
              <img className="serviceLogo" src={TidalIcon}/>
              <h3 className="serviceTitle">Tidal</h3>
            </a>
          </div>

          {/* Youtube Link */}
          <div className="linkBlock youtubeLinkBlock">
            <a href={requestedUser.YoutubeUrl} target="_blank">
              <img className="serviceLogo" src={YoutubeIcon}/>
              <h3 className="serviceTitle">Youtube</h3>
            </a>
          </div>

          {/* Amazon Link */}
          <div className="linkBlock amazonLinkBlock">
            <a href={requestedUser.AmazonUrl} target="_blank">
              <img className="serviceLogo" src={AmazonIcon}/>
              <h3 className="serviceTitle">Amazon</h3>
            </a>
          </div>

          {/* Website Link */}
          <div className="linkBlock websiteLinkBlock">
            <a href={requestedUser.WebsiteUrl} target="_blank">
              <img className="serviceLogo" src={WebsiteIcon}/>
              <h3 className="serviceTitle">Website</h3>
            </a>
          </div>

        </section>

      {/* FOOTER PART */}
      <div className="profile-footer">
        <a href="https://app.curieux.io" target="_blank"><img className="footerCurieuxLogo" src={CurieuxPurpleLogo}/></a>
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