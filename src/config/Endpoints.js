module.exports = {
  USER: {
    GET: {
      fetchALLUsers: '/users',
    },
    POST: {
      registerUser: '/users',
      loginUser: '/users/login',
      confirmLogin: '/users/login-confirmation',
      forgetPassword: '/users/forget-password',
      resetPassword: '/users/reset-password/:token',
    },
    PUT: {
      updateUser: '/users',
    },
  },
  CHAT: {
    GET: {
      fetchUserChats: '/chat',
    },
    POST: {
      accessChat: '/chat/access',
      createGroupChat: '/chat/groups',
    },
    PUT: {
      renameGroup: '/chat/groups/rename',
      addToGroup: '/chat/groups/join',
      removeFromGroup: '/chat/groups/leave',
    },
  },
  MESSAGE: {
    GET: {
      fetchMessagesByChatId: '/messages/:chatId',
    },
    POST: {
      sendMessage: '/messages',
    },
    DELETE: {
      deleteMessagesByChatId: '/messages/:chatId',
    },
  },
  PATIENT: {
    GET: {
      fetchPatients: '/patients',
      fetchPatientsById: '/patients/:id',
    },
    POST: {
      createPatient: '/patients',
    },
    PUT: {
      updatePatientById: '/patients/:id',
    },
    DELETE: {
      deletePatientById: '/patients/:id',
    },
  },
  CALENDAR: {
    GET: {
      fetchMonthCalendar: '/calendar/:year/:month',
    },
    PUT: {
      setCalendarDayAvailability: '/calendar/:year/:month/:day/availability',
    },
  },
  APPOINTMENT: {
    GET: {
      fetchPatientAppointments: '/appointments/:patientId',
      fetchMonthAppointments: '/appointments/:year/:month',
      fetchDayAppointments: '/appointments/:year/:month/:day',
    },
    POST: {
      createNewAppointment: '/appointments/new',
      relateNewAppointment: '/appointments/relate',
    },
    PUT: {
      toggleConfirmation: '/appointments/:id/toggle-confirmation',
      toggleLeave: '/appointments/:id/toggle-leave',
      updateAppointment: '/appointments/:id/update',
      updateAppointmentSync: '/appointments/:id/update-sync',
    },
    DELETE: {
      deleteAppointment: '/appointments/:id',
    },
  },
  PAYMENT: {
    GET: {
      fetchDayPayments: '/payments/:year/:month/:day',
    },
    POST: {
      createPayment: '/payments/:year/:month/:day',
    },
  },
  STATISTIC: {
    GET: {
      fetchPaymentsByDateRange: '/statistics/:startDate/:endDate/payments-revenue',
      fetchAppointmentsRevenueByDateRange: '/statistics/:startDate/:endDate/appointments-revenue',
    },
  },
}
