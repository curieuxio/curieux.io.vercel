import { useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';

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
        <div>
            <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'}>Sign in to Curieux</Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                Via magic link with your email below ✌️
                </Text>
            </Stack>
            <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
                <Stack spacing={4}>
                <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input value={email} onChange={e => setEmail(e.target.value)} type="email" />
                </FormControl>
                <Stack spacing={10}>
                    <Button
                    onClick={e => {
                        e.preventDefault();
                        handleLogin(email);
                    }}
                    isLoading={loading}
                    loadingText="Signing in ..."
                    colorScheme="teal"
                    variant="outline"
                    spinnerPlacement="start"
                    bg={'#7000FF'}
                    color={'white'}
                    _hover={{
                        bg: '#5800CC'
                    }}>
                    {loading || 'Send magic link'}
                    </Button>
                </Stack>
                </Stack>
            </Box>
            </Stack>
        </Flex>
    </div>
    );
}