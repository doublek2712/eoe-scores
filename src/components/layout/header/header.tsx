import { FC, useRef, useState } from 'react'
import { Link, ToPathOption, useNavigate } from '@tanstack/react-router'
import { MenuIcon, XIcon } from 'lucide-react'
import { useAuthStore } from '../../../store/auth'

interface HeaderProps {
  routes: {
    to: ToPathOption,
    label: string,
  }[]
}
export const Header: FC<HeaderProps> = ({ routes, ...rest }) => {
  const [toggle, setToggle] = useState<boolean>(false)
  const navRef = useRef<HTMLElement>(null)

  const navigate = useNavigate()
  const authStore = useAuthStore((state) => state)

  const handleToggle = () => {
    setToggle((prev) => !prev)
    navRef.current?.classList.toggle('hidden')
  }
  const handleLogout = () => {
    authStore.delete()
    handleToggle()
    navigate({ to: '/' })
  }

  return (
    <header className='fixed min-w-screen flex flex-col items-end' {...rest}>
      <button onClick={handleToggle} className='text-white p-2 mt-4 mx-2 mb-2 z-50'>
        {toggle ? (
          <XIcon size={32} />
        ) : (
          <MenuIcon size={32} />
        )}
      </button>
      <nav ref={navRef} className='hidden absolute top-0 left-0 min-h-screen pt-16 min-w-screen backdrop-blur-sm bg-transparent'>
        <ul className='flex flex-col gap-2'>
          {routes.map((route) => (
            <li key={route.to}>
              <Link
                className='block w-full px-4 py-6 text-white text-3xl active:bg-white/10'
                to={route.to}
                onClick={handleToggle}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
        <button className='absolute bottom-2 block w-full px-4 py-6 text-white text-3xl active:bg-white/10 hover:cursor-pointer' onClick={handleLogout}>
          Đăng xuất
        </button>
      </nav>
    </header >
  )
}
