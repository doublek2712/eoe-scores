
const MASTER_ARRAY = Array.from({ length: 5 }, (_, index) => import.meta.env.VITE_MASTER_SECRET + `${index + 1}`)

export type USER_ROLES = 'admin' | 'master' | 'guest'

export const isAuthenticated = (secret: string): boolean => {
  return (secret === import.meta.env.VITE_ADMIN_SECRET) || (MASTER_ARRAY.includes(secret))
}

const getAuthorization = (secret: string): USER_ROLES => {
  return (secret === import.meta.env.VITE_ADMIN_SECRET) ? 'admin' :
    (MASTER_ARRAY.includes(secret)) ? 'master' : 'guest'
}
export const isAuthorized = (secret: string, requiredRole: USER_ROLES): boolean => {
  return getAuthorization(secret) === requiredRole
}

export const getRoleString = (secret: string): string => {
  return (secret === import.meta.env.VITE_ADMIN_SECRET) ? 'Khải chắc lun' :
    (MASTER_ARRAY.includes(secret)) ? `trưởng trạm ${secret.charAt(secret.length - 1)}` : 'khách'
}
export const getRole = (secret: string): string => {
  return (secret === import.meta.env.VITE_ADMIN_SECRET) ? 'admin' :
    (MASTER_ARRAY.includes(secret)) ? `master${secret.charAt(secret.length - 1)}` : 'guest'
}