import { STATION_NAME } from "../constants/station"

export const getStationName = (userRole: string) => {
  if (userRole === 'admin') return STATION_NAME.ADMIN
  return `${STATION_NAME.STATION} ${userRole.charAt(userRole.length - 1)}`

}