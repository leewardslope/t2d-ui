import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading, SimpleGrid } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
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
      })
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
                setLoading(false)

                if (loadedData.data) {
                    setssh(false)
                    setSSHData(loadedData.data)
                } else {
                    setssh(true)
                }
            } catch (error) {
                setssh(false)
                setLoading(false)
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
            <Box textAlign="center" fontSize="x-large ">Loading</Box>
        )
    }
    if (ssh) {
        return <FormikSSH />
    } else {
        return (
            <>
                <Heading size="lg" textAlign="center" my="5">Add New Apps</Heading>
                <SimpleGrid mt="8" alignItems="center" justifyContent="center" maxWidth="1400px" marginX="auto" columns={[1, 1, 2, 3]} gap={8}>
                    <Flex
                        borderRadius="md"
                        fontWeight="500"
                        fontSize="lg"
                        color="gray.600"
                        justifyContent="center"
                        borderWidth="1px"
                        py="20"
                        px="4"
                        backgroundColor="blackAlpha.50"
                        alignItems="center"
                        cursor="pointer"
                        _hover={{
                            boxShadow: 'md',
                        }}
                    >
                        <Box
                            justifyContent="center"
                            borderColor="blackAlpha.300"
                            borderWidth="1px"
                            px="2"
                            fontSize="xl"
                            marginRight="2"
                            bg="white"
                            borderRadius="sm"
                        >
                            +
                        </Box>{' '}
                        Add new forem
                    </Flex>
                </SimpleGrid>
                <Heading size="lg" textAlign="center" my="5">Server Status</Heading>
                <Box px="2"
                    fontSize="xl"
                    marginRight="2"
                    display="grid"
                    justifyContent="center"
                    borderRadius="sm">
                        
                    <Box>Server Status: Connected</Box>
                    <Box>Server Host Name: {sshData.username}</Box>
                    <Box>Server IP: {sshData.host}</Box>
                    <Box>Server Key Name: {sshData.sshName}</Box>
                </Box>

            </>
        );
    }
};

export default DashboardBody;
