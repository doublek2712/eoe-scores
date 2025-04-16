import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Header } from '../components/layout/header/header'
import { isAuthenticated } from '../lib/helpers/auth'
import { useAuthStore } from '../store/auth'
import { FC } from 'react'

const RootLayout: FC = () => {
  const auth = useAuthStore((state) => state.secret)
  const mainRoutes = [
    { to: '/', label: 'Tổng quan' },
    { to: '/guide', label: 'Hướng dẫn' },
    { to: '/contact', label: 'Liên hệ' },
  ]

  if (isAuthenticated(auth)) {
    return (
      <>
        <Header routes={auth === import.meta.env.VITE_ADMIN_SECRET ? [...mainRoutes, { to: '/admin', label: 'Quản trị' }] : mainRoutes} />
        <main className='min-h-screen px-4 pt-[4.5rem] pb-8 overflow-hidden'>
          <Outlet />
        </main>
      </>
    )
  }
  else {
    return (
      <main className='min-h-screen px-4 pt-[4.5rem] pb-8 overflow-hidden'>
        <Outlet />
      </main>
    )
  }

}

export const Route = createRootRoute({
  component: RootLayout,
})

