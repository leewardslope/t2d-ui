// import React, {useContext} from 'react';
import React, { useContext, useState } from 'react';
import {
  Avatar,
  Heading,
  Text,
  Box,
  Flex,
  VStack,
  HStack,
  Divider,
  IconButton,
  Button,
  useToast,
  Spacer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useMediaQuery,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { BsTerminal } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';

import AlertInput from '../../shared/components/UIElements/Modals/AlertInput';
import { AuthContext } from '../../shared/context/auth-context';

const AppItem = props => {
  const auth = useContext(AuthContext);
  const toast = useToast();
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const [isLoading, setIsLoading] = useState(false);
  // Intentionally not a state
  const [notificationMsg, setNotificationMsg] = useState([]);
  const afterDeleteConfirm = () => {
    // console.log(`pressed on delete: ${props.title} ${props.id}`);
    const deleteApp = async () => {
      try {
        onClose();
        await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/api/apps/${props.id}`,
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        );
        toast({
          title: `Deleted`,
          status: 'success',
          position: 'top',
          isClosable: true,
        });
        props.onDelete(props.id);
      } catch (error) {
        onClose();
        toast({
          title: `${error.response.data.message}`,
          status: 'error',
          position: 'top',
          isClosable: true,
        });
      }
    };
    deleteApp();
  };

  const buildApp = async () => {
    setIsLoading(true);
    // const creator = props.creatorId; // can be used to confirm and establish SSH connection
    // const appName = props.name;

    const appId = props.id; // can be used to confirm and extract ENV data
    const token = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };
    const socket = io(`${process.env.REACT_APP_BASE_URL}/`);

    await socket.on(`server-notification-msg-${appId}`, notification => {
      setNotificationMsg(oldArray => [...oldArray, `${notification.message}`]);
    });

    await socket.on(`server-notification-${appId}`, notification => {
      if (notification.message === 'done') {
        setIsLoading(false);
      }
      toast({
        title: `${notification.message}`,
        status: 'info',
        position: 'top',
        isClosable: true,
      });
    });

    // socket.emit('build-data', 10, 'forem', { appId: `${appId}` }); // I can also use it here

    // Base Step
    let errorOccurred = false;
    const baseStep = async step => {
      let check;
      try {
        check = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/build/${appId}/${step}`,
          token
        );

        await toast({
          title: `${check.data.message}`,
          status: 'success',
          position: 'top',
          isClosable: true,
        });

        return;
      } catch (error) {
        console.log(error);

        if (error.response.data.message) {
          setIsLoading(false);
          toast({
            title: `${error.response.data.message}`,
            status: 'error',
            position: 'top',
            isClosable: true,
          });

          errorOccurred = true;
          return error;
        }

        // This will stop moving forward!
      }
    };

    !errorOccurred && (await baseStep('check'));
    !errorOccurred && (await baseStep('connect'));
    // !errorOccurred && (await baseStep('send'));
    !errorOccurred && (await baseStep('dokku'));

    // setIsLoading(false);
  };

  const btn = useDisclosure();

  const btnRef = React.useRef();

  // The flex contains 2 renders based upon the mediaquery, one for mobile and the other for PC, I don't a much better way, so added 2 different renders.
  return (
    <Flex m="2" justifyContent="center">
      {!isLargerThan1280 && (
        <VStack
          // divider={<StackDivider borderColor="grey.100" />}
          borderColor="grey.100"
          borderRadius="xl"
          mx="4"
          my="2"
          p="2"
          maxW={{ base: '90vw', sm: '80vw', lg: '60vw', xl: '60vw' }}
          w="100%"
          // w="300px"
          boxShadow="base"
          // alignItems="stretch"
          _hover={{
            boxShadow: 'md',
            borderRadius: 'xl',
            borderColor: 'grey.800',
          }}
        >
          <HStack p="2">
            <Box>
              <Avatar name={props.name} src={props.image} />
            </Box>

            <Box>
              <Heading size="md" color="teal">
                {props.title}
              </Heading>
              <Text fontSize="md">{props.name}</Text>
            </Box>
          </HStack>

          {auth.userId === props.creatorId && (
            <VStack>
              <Divider orientation="horizontal" />
              <HStack>
                <Button
                  isLoading={isLoading}
                  onClick={buildApp}
                  colorScheme="teal"
                  variant="ghost"
                >
                  Build
                </Button>
                <Button
                  colorScheme="teal"
                  variant="ghost"
                  mt={3}
                  // ref={btnRef}
                  onClick={btn.onOpen}
                >
                  Logs
                </Button>

                <Link to={`/apps/${props.creatorId}/terminal`}>
                  <IconButton
                    isRound="true"
                    variant="ghost"
                    aria-label="Open Terminal"
                    colorScheme="blue"
                    icon={<BsTerminal />}
                  />
                </Link>

                <Link to={`/apps/${props.id}`}>
                  <IconButton
                    isRound="true"
                    variant="ghost"
                    aria-label="Edit App"
                    colorScheme="teal"
                    icon={<EditIcon />}
                  />
                </Link>

                <IconButton
                  isRound="true"
                  variant="ghost"
                  aria-label="Delete App"
                  colorScheme="red"
                  onClick={() => setIsOpen(true)}
                  icon={<DeleteIcon />}
                />

                <AlertInput
                  isOpen={isOpen}
                  onClose={onClose}
                  cancelRef={cancelRef}
                  alertHeader="Delete App"
                  alertBody="Are you sure? You can't undo this action afterwards."
                  alertFooter1="Cancel"
                  alertFooter2="Delete"
                  alertFooter2Color="red"
                  todo={afterDeleteConfirm}
                />

                <Modal
                  onClose={btn.onClose}
                  finalFocusRef={btnRef}
                  isOpen={btn.isOpen}
                  scrollBehavior="inside"
                  size="lg"
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>App Logs</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Box color="primary">
                        {notificationMsg.map((e, index) => (
                          <Text key={index}>{e}</Text>
                        ))}
                      </Box>
                    </ModalBody>
                    <ModalFooter>
                      <Text color="teal">
                        Build end with "Build Finished" Notification
                      </Text>
                      <Button m="1" onClick={btn.onClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </HStack>
            </VStack>
          )}
        </VStack>
      )}

      {isLargerThan1280 && (
        <HStack
          // divider={<StackDivider borderColor="grey.100" />}
          borderColor="grey.100"
          borderRadius="xl"
          mx="4"
          my="2"
          p="2"
          maxW={{ base: '90vw', sm: '80vw', lg: '60vw', xl: '60vw' }}
          w="100%"
          // w="300px"
          boxShadow="base"
          // alignItems="stretch"
          _hover={{
            boxShadow: 'md',
            borderRadius: 'xl',
            borderColor: 'grey.800',
          }}
        >
          <HStack p="2">
            <Box>
              <Avatar name={props.name} src={props.image} />
            </Box>

            <Box>
              <Heading size="md" color="teal">
                {props.title}
              </Heading>
              <Text fontSize="md">{props.name}</Text>
            </Box>
          </HStack>
          <Spacer />
          <HStack>
            {auth.userId === props.creatorId && (
              <HStack>
                <Button
                  isLoading={isLoading}
                  onClick={buildApp}
                  colorScheme="teal"
                  variant="ghost"
                >
                  Build
                </Button>
                <Button
                  colorScheme="teal"
                  variant="ghost"
                  mt={3}
                  // ref={btnRef}
                  onClick={btn.onOpen}
                >
                  Status
                </Button>

                <Link to={`/apps/${props.creatorId}/terminal`}>
                  <IconButton
                    isRound="true"
                    variant="ghost"
                    aria-label="Open Terminal"
                    colorScheme="blue"
                    icon={<BsTerminal />}
                  />
                </Link>

                <Link to={`/apps/${props.id}`}>
                  <IconButton
                    isRound="true"
                    variant="ghost"
                    aria-label="Edit App"
                    colorScheme="teal"
                    icon={<EditIcon />}
                  />
                </Link>

                <IconButton
                  isRound="true"
                  variant="ghost"
                  aria-label="Delete App"
                  colorScheme="red"
                  onClick={() => setIsOpen(true)}
                  icon={<DeleteIcon />}
                />

                <AlertInput
                  isOpen={isOpen}
                  onClose={onClose}
                  cancelRef={cancelRef}
                  alertHeader="Delete App"
                  alertBody="Are you sure? You can't undo this action afterwards."
                  alertFooter1="Cancel"
                  alertFooter2="Delete"
                  alertFooter2Color="red"
                  todo={afterDeleteConfirm}
                />

                <Modal
                  onClose={btn.onClose}
                  finalFocusRef={btnRef}
                  isOpen={btn.isOpen}
                  scrollBehavior="inside"
                  size="lg"
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>App Logs</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Box color="primary">
                        {notificationMsg.map((e, index) => (
                          <Text key={index}>{e}</Text>
                        ))}
                      </Box>
                    </ModalBody>
                    <ModalFooter>
                      <Text color="teal">
                        Build end with "Build Finished" Notification
                      </Text>
                      <Button m="1" onClick={btn.onClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </HStack>
            )}
          </HStack>
        </HStack>
      )}
    </Flex>
  );
};

export default AppItem;
