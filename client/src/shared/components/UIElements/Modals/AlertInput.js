import React from 'react';
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';

const AlertInput = props => {
  const {
    isOpen,
    onClose,
    cancelRef,
    alertHeader,
    alertBody,
    alertFooter1,
    alertFooter2,
    alertFooter2Color,
    todo,
  } = props;

  // We will define different functions here => presently the click button closes the modal.

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {alertHeader}
          </AlertDialogHeader>

          <AlertDialogBody>{alertBody}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {alertFooter1}
            </Button>
            <Button colorScheme={alertFooter2Color} onClick={todo} ml={3}>
              {alertFooter2}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default AlertInput;
