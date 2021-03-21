import { useState } from 'react';
import dashify from 'dashify';
import axios from 'axios';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { useUser } from '@auth0/nextjs-auth0';

const Post = () => {
    const { user } = useUser();

  const [content, setContent] = useState({
    calle: undefined,
    altura: undefined,
    descripcion: undefined,
  })
  const onChange = (e) => {
    const { value, name } = e.target;
    setContent(prevState => ({ ...prevState, [name]: value }));
  }
  const onSubmit = async () => {
    const { calle, altura, descripcion } = content;
    await axios.post('/api/post', { calle, altura, slug: dashify(descripcion), descripcion });
  }
  return (
    <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} align={'center'}>Publicación de Acoso Callejero</Heading>
            <Text fontSize={'lg'} color={'gray.600'} align={'center'} pt={4}>
            <Text as={'span'} color={'green.600'} fontWeight="bold">{user?.given_name}</Text>, brinda información al respecto.
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="calle">
                <FormLabel>Calle</FormLabel>
                <Input type="email" onChange={onChange} />
              </FormControl>
              <FormControl id="altura">
                <FormLabel>Altura</FormLabel>
                <Input type="altura" onChange={onChange} />
              </FormControl>
              <FormControl id="descripcion">
                <FormLabel>Descripcion</FormLabel>
                <Textarea size="md" rows={6} placeholder="Brinda información al respecto" onChange={onChange} />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={onSubmit}
                >
                  Publicar
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
  );
};

export default Post;