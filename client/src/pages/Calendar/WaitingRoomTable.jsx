import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react'

import { DropWrapper } from './Dnd'

import { HARD_CODED_DATA } from './data'

export default function WaitingRoomTable() {
  return (
    <TableContainer>
      <DropWrapper>
        <Table size="sm">
          <TableCaption>Salle D'Attente</TableCaption>
          <Thead>
            <Tr>
              <Th>Nom</Th>
              <Th>Age</Th>
              <Th>Motif de consultation</Th>
              <Th>Etate général</Th>
              <Th>Diagnostique</Th>
              <Th>Plan de traitement</Th>
              <Th>Historique</Th>
            </Tr>
          </Thead>
          <Tbody>
            {HARD_CODED_DATA.map((item) => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>{item.age}</Td>
                <Td>{item.motif}</Td>
                <Td>{item.state}</Td>
                <Td>{item.diagnostic}</Td>
                <Td>{item.treatmentPlan}</Td>
                <Td>{item.history}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </DropWrapper>
    </TableContainer>
  )
}
