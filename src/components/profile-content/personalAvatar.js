// Importing Dependencies //
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/supabaseClient';
import { Avatar, Button } from '@chakra-ui/react';

export default function PersonalAvatar({ url, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log('Error downloading image: ', error.message);
    }
  }

  async function uploadAvatar(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <React.Fragment>
      
      {/* Artist Banner */}
      {avatarUrl ? (
      <div className="artist-profile-banner">
        <div className="artist-profile-banner-content">
          <Avatar
            bg={'#efecf4'}
            size={'300px'}
            width={'100%'}
            height={'250px'}
            src={avatarUrl}
            marginBottom={'Opx'}
            alt="Avatar"
            pos={'relative'}
            borderRadius={'1.7rem 1.7rem 0 0'}
            filter={'blur(3px)'}
          />
        </div>
      </div>
      ) : (
        <Avatar
          bg={'#efecf4'}
          size={'300px'}
          width={'100%'}
          height={'250px'}
          src={avatarUrl}
          marginBottom={'Opx'}
          alt="Avatar"
          pos={'relative'}
          borderRadius={'1.7rem 1.7rem 0 0'}
          backdropFilter={'blur(10px)'}
        />
      )}
      
      <div className="artist-profile-main-informations">
        {/* Artist Profile Picture */}
        {avatarUrl ? (
          <div className="profile-user-picture">
            <Avatar
              bg={'#efecf4'}
              width={'160px'}
              height={'160px'}
              src={avatarUrl}
              marginBottom={'Opx'}
              alt="Avatar"
              pos={'relative'}
              _after={{
                content: '""',
                w: 25 + "px",
                h: 25 + "px",
                bg: '#4fffca',
                border: '4px solid white',
                rounded: 'full',
                pos: 'absolute',
                bottom: 0,
                right: 5
              }}
            />
          </div>
        ) : (
          <div className="profile-user-picture">
            <Avatar
              bg={'#efecf4'}
              width={'160px'}
              height={'160px'}
              src={avatarUrl}
              marginBottom={'Opx'}
              alt="Avatar"
              pos={'relative'}
              _after={{
                content: '""',
                w: 25 + "px",
                h: 25 + "px",
                bg: '#4fffca',
                border: '4px solid white',
                rounded: 'full',
                pos: 'absolute',
                bottom: 0,
                right: 5
              }}
            />
          </div>
        )}
          <button className="button-purple upload-profile-picture-button">
            <label className="buttonLabel" htmlFor="single" >
              {uploading ? 'Uploading...' : 'Upload'}
            </label>
          </button>

          <input
            style={{
              visibility: 'hidden',
              position: 'absolute'
            }}
            type="file"
            id="single"
            accept="image/png, image/gif, image/jpeg, image/heic"
            onChange={uploadAvatar}
            disabled={uploading}
          />
      </div>
      </React.Fragment>
  );
}