import Head from 'next/head';
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
} from '@chakra-ui/react';
import { Link } from "@chakra-ui/react";
import { useUser } from '@auth0/nextjs-auth0';

export default function CallToActionWithAnnotation() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Welcome <br />
            <Text as={'span'} color={'green.400'}>
              {user && (
                <div>
                  <h2>{user.given_name}</h2>
                </div>
              )}
            </Text>
          </Heading>
          <Text color={'gray.500'} fontSize="2xl">
            Boilerplate made with Next.js, Chakra UI and Auth0 Login.
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Link href="/api/auth/login">
              <Button
                colorScheme={'green'}
                bg={'green.400'}
                rounded={'full'}
                px={6}
                _hover={{
                  bg: 'green.500',
                }}>
                Login
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}