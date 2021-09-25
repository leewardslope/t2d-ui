// import { Button } from '@chakra-ui/button';
import {
  Box,
  Heading,
  SimpleGrid,
  VStack,
  HStack,
  Text,
} from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FormikSSH from '../../shared/components/UIElements/FormElements/FormikSSH';
import { AuthContext } from '../../shared/context/auth-context';

const DashboardBody = () => {
  const [ssh, setssh] = useState(true);
  const [loading, setLoading] = useState(true);
  const [sshData, setSSHData] = useState({
    host: '',
    username: '',
    sshName: '',
    identity: '',
  });
  const toast = useToast();
  const auth = useContext(AuthContext);
  useEffect(() => {
    const getData = async () => {
      try {
        const loadedData = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/ssh`,
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        );
        setLoading(false);

        if (loadedData.data) {
          setssh(false);
          setSSHData(loadedData.data);
        } else {
          setssh(true);
        }
      } catch (error) {
        setssh(false);
        setLoading(false);
        toast({
          title: `${error.response.data.message}`,
          status: 'error',
          position: 'top',
          isClosable: true,
        });
      }
    };
    getData();
  }, [toast, auth.token]);

  if (loading) {
    return (
      <Box textAlign="center" fontSize="x-large ">
        Loading
      </Box>
    );
  }
  if (ssh) {
    return <FormikSSH />;
  } else {
    return (
      <>
        <Heading size="lg" textAlign="center" my="5">
          Server Status
        </Heading>
        <Box
          px="2"
          fontSize="xl"
          marginRight="2"
          display="grid"
          justifyContent="center"
          borderRadius="sm"
          columns={[1, 1, 2, 3]}
        >
          <HStack>
            <VStack
              p="4"
              m="2"
              borderRadius="md"
              // borderWidth="1px"
              backgroundColor="white"
              color="gray.600"
              boxShadow="sm"
              _hover={{
                boxShadow: 'md',
              }}
            >
              {/* <Box>Server Status: Connected</Box>
              <Box>Server Host Name: {sshData.username}</Box>
              <Box>Server IP: {sshData.host}</Box>
              <Box>Server Key Name: {sshData.sshName}</Box> */}
              <HStack>
                <Text color="teal">Server Status:</Text>
                <Text color="green">Connected</Text>
              </HStack>
              <HStack>
                <Text color="teal">Host Name:</Text>
                <Text>{sshData.username}</Text>
              </HStack>
              <HStack>
                <Text color="teal">Server IP:</Text>
                <Text>{sshData.host}</Text>
              </HStack>
              <HStack>
                <Text color="teal">Server Key Name:</Text>
                <Text>{sshData.sshName}</Text>
              </HStack>
            </VStack>
            <VStack
              p="4"
              m="2"
              borderRadius="md"
              backgroundColor="white"
              // borderWidth="1px"
              color="gray.600"
              boxShadow="sm"
              _hover={{
                boxShadow: 'md',
              }}
            >
              <HStack>
                <Text color="teal">Number of Apps:</Text>
                <Text>Coming Soon</Text>
              </HStack>
              <HStack>
                <Text color="teal">RAM Usage:</Text>
                <Text>Coming Soon</Text>
              </HStack>
              <HStack>
                <Text color="teal">Disk Usage:</Text>
                <Text>Coming Soon</Text>
              </HStack>
              <HStack>
                <Text color="teal">SSH Key:</Text>
                <Text color="green">Encrypted</Text>
              </HStack>
            </VStack>
          </HStack>
        </Box>
        <Heading size="lg" textAlign="center" my="5">
          Add New Apps
        </Heading>
        <SimpleGrid
          mt="8"
          alignItems="center"
          justifyContent="center"
          maxWidth="1400px"
          marginX="auto"
          columns={[1, 1, 2, 3]}
          gap={8}
        >
          <Link to="/app/new">
            <VStack
              borderRadius="md"
              overflow="hidden"
              fontWeight="500"
              fontSize="lg"
              color="gray.600"
              justifyContent="center"
              borderWidth="1px"
              alignItems="center"
              cursor="pointer"
              _hover={{
                boxShadow: 'md',
              }}
            >
              <Box
                height="200px"
                backgroundPosition="center"
                width="100%"
                backgroundImage="https://forem.dev/images/OOj6V9EW_qwSfvCWiRvu1glK-F66cF7I6qplZ8om5pk/rs:fill:320:320/mb:500000/aHR0cHM6Ly9mb3Jl/bS5kZXYvcmVtb3Rl/aW1hZ2VzL3VwbG9h/ZHMvb3JnYW5pemF0/aW9uL3Byb2ZpbGVf/aW1hZ2UvMS8wNzc0/NDI3NC04OGQ1LTQx/MzEtOWY2Ni1iYjY0/MzAwMWFmZTEucG5n"
              >
                {/* <Image
                                src="
                                alt="Segun Adebayo"
                                objectFit="contain"
                            /> */}
              </Box>
              <Box w="100%" p="4" mt="0">
                <Heading>Forem</Heading>
                <Box>
                  Open source software for building communities, the platform
                  that powers dev.to
                </Box>
              </Box>
            </VStack>
          </Link>
        </SimpleGrid>
      </>
    );
  }
};

export default DashboardBody;
