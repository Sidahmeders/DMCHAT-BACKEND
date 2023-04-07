import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react'

import { HARD_CODED_DATA } from './data'

export default function NextAppointments() {
  return (
    <TableContainer>
      <Table size="sm">
        <TableCaption>Rendez-vous prochain</TableCaption>
        <Thead>
          <Tr>
            <Th>Nom</Th>
            <Th>Age</Th>
            <Th>Motif de consultation</Th>
            <Th>Etate général</Th>
            <Th>Diagnostique</Th>
            <Th>Plan de traitement</Th>
            <Th>Historique</Th>
            <Th>Imprimes</Th>
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
              <Td>{item.prints}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
