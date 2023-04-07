import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MessageCircle, Calendar, PieChart } from 'react-feather'

import { getPageRoute, setPageRoute } from '../../utils'
import ChatNotification from '../miscellaneous/ChatNotification'

import './TopNavigation.scss'

const APP_ROUTES = {
  PATIENT_LIST: '/chats',
  CALENDAR: '/calendar',
  STATISTICS: '/statistics',
}

export default function TopNavigation() {
  const location = useLocation()
  const [selectedRoute, setSelectedRoute] = useState(getPageRoute())

  useEffect(() => {
    setSelectedRoute(getPageRoute())
  }, [location.pathname])

  return (
    <div className="top-navigation-container">
      <Link
        className={`${selectedRoute === APP_ROUTES.PATIENT_LIST ? 'selected' : ''}`}
        onClick={() => setPageRoute(APP_ROUTES.PATIENT_LIST)}
        to={APP_ROUTES.PATIENT_LIST}>
        <MessageCircle />
      </Link>

      <Link
        className={`${selectedRoute === APP_ROUTES.CALENDAR ? 'selected' : ''}`}
        onClick={() => setPageRoute(APP_ROUTES.CALENDAR)}
        to={APP_ROUTES.CALENDAR}>
        <Calendar />
      </Link>

      <Link
        className={`${selectedRoute === APP_ROUTES.STATISTICS ? 'selected' : ''}`}
        onClick={() => setPageRoute(APP_ROUTES.STATISTICS)}
        to={APP_ROUTES.STATISTICS}>
        <PieChart />
      </Link>
      <ChatNotification />
    </div>
  )
}
