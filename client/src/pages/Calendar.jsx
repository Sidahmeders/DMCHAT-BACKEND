import { useDisclosure } from '@chakra-ui/react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Stack,
} from '@chakra-ui/react'

import './Calendar.scss'

function AddPatientModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Ajouter patient</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ajouter un patient</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Input type="text" placeholder="Nom" />
              <Input type="text" placeholder="Age" />
              <Input type="text" placeholder="Motif de consultation" />
              <Input type="text" placeholder="Etate général" />
              <Input type="datetime-local" placeholder="Fixe rendez vous" />
              <Input type="text" placeholder="Diagnostique" />
              <Input type="text" placeholder="Plan de traitement" />
              <Input type="text" placeholder="Historique" />
              <Input type="text" placeholder="Imprimes" />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => {}}>
              Create
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

const Calendar = () => {
  return (
    <div className="calendar-page-container">
      <AddPatientModal />

      <div className="calendar-list">
        <div className="waiting-room">
          <h3>Salle d'attente</h3>
        </div>

        <div className="next-appointments">
          <h3>Rendez-vous prochain</h3>
        </div>
      </div>
    </div>
  )
}

export default Calendar
