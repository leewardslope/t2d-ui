import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading, SimpleGrid } from '@chakra-ui/layout';
import { NavLink } from 'react-router-dom';

const DashboardBody = () => {
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
            <Flex px="2"
                fontSize="xl"
                marginRight="2"
                justifyContent="center"
                borderRadius="sm">
                No Information present please <NavLink to="/setup">
                    <Button
                        mx="1"
                        fontSize="xl"
                        colorScheme="teal"
                        variant="link"
                    >
                        setup
                    </Button>
                </NavLink> you server
            </Flex>

        </>
    );
};

export default DashboardBody;
