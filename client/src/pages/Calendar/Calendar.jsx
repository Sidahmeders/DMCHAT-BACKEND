import { Stack } from '@chakra-ui/react'

import AddPatientModal from './AddPatientModal'
import WaitingRoomTable from './WaitingRoomTable'
import NextAppointments from './NextAppointments'

import './Calendar.scss'

const Calendar = () => {
  return (
    <div className="calendar-page-container">
      <AddPatientModal />

      <Stack spacing="6" paddingTop="6">
        <WaitingRoomTable />
        <NextAppointments />
      </Stack>
    </div>
  )
}

export default Calendar
