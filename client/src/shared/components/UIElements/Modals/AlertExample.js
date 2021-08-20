import React from 'react';
import { Button } from '@chakra-ui/react';
import AlertInput from './AlertInput';

const Alert = () => {
  // Don't forget to copy these

  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const myTodo = () => {
    console.log('you confirmed');
    onClose();
  };

  return (
    <>
      <Button colorScheme="red" onClick={() => setIsOpen(true)}>
        Delete App
      </Button>

      <AlertInput
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        alertHeader="Delete App"
        alertBody="Are you sure? You can't undo this action afterwards."
        alertFooter1="Cancel"
        alertFooter2="Delete"
        alertFooter2Color="red"
        todo={myTodo}
      />
    </>
  );
};

export default Alert;
