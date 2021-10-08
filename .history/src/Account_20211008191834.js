import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import PersonalAvatar from './PersonalAvatar';
import {
  Box,
  useColorModeValue,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast
} from '@chakra-ui/react';

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [SpotifyUrl, setSpotifyUrl] = useState(null);
  const [AvatarUrl, setAvatarUrl] = useState(null);
  const toast = useToast();

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, SpotifyUrl, AvatarUrl`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setSpotifyUrl(data.SpotifyUrl);
        setAvatarUrl(data.AvatarUrl);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, SpotifyUrl, AvatarUrl }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        username,
        SpotifyUrl,
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
        title: 'Profile updated.',
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
    <div>
      <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
        <Box
          maxW={'445px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}
          justifyItems={'center'}
          justifyContent={'center'}>
          <PersonalAvatar
            url={AvatarUrl}
            onUpload={url => {
              setAvatarUrl(url);
              updateProfile({ username, SpotifyUrl, AvatarUrl: url });
            }}
          />
          <Text fontSize={'sm'} fontWeight={500} color={'gray.500'} mb={4}>
            {session.user.email}
          </Text>
          <Stack spacing={4} p={4}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type={'text'}
                value={username || ''}
                onChange={e => setUsername(e.target.value)}
                placeholder={username || 'username'}
                color={useColorModeValue('gray.800', 'gray.200')}
                bg={useColorModeValue('gray.100', 'gray.600')}
                rounded={'full'}
                border={0}
                _focus={{
                  bg: useColorModeValue('gray.200', 'gray.800'),
                  outline: 'none'
                }}
              />
            </FormControl>
          </Stack>
          <Stack spacing={4} p={4}>
            <FormControl>
              <FormLabel>SpotifyUrl</FormLabel>
              <Input
                type={'text'}
                value={SpotifyUrl || ''}
                onChange={e => setSpotifyUrl(e.target.value)}
                placeholder={SpotifyUrl || 'SpotifyUrl'}
                color={useColorModeValue('gray.800', 'gray.200')}
                bg={useColorModeValue('gray.100', 'gray.600')}
                rounded={'full'}
                border={0}
                _focus={{
                  bg: useColorModeValue('gray.200', 'gray.800'),
                  outline: 'none'
                }}
              />
            </FormControl>
          </Stack>
          <Stack mt={8} direction={'row'} spacing={4}>
            <Button
              onClick={() => supabase.auth.signOut()}
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              _focus={{
                bg: 'gray.200'
              }}>
              Logout
            </Button>
            <Button
              isLoading={loading}
              loadingText="Updating ..."
              onClick={() => updateProfile({ username, SpotifyUrl, AvatarUrl })}
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              bg={'green.400'}
              color={'white'}
              boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
              _hover={{
                bg: 'green.500'
              }}
              _focus={{
                bg: 'green.500'
              }}>
              {loading || 'Update'}
            </Button>
          </Stack>
        </Box>
      </Flex>
    </div>
  );
}