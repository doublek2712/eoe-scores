import { FC, useRef, useState } from 'react'
import { useAuthStore } from '../store/auth'
import { isAuthenticated } from '../lib/helpers/auth'
import { useNavigate } from '@tanstack/react-router'
import { EyeClosedIcon, EyeIcon } from 'lucide-react'

interface LoginProps {

}
export const Login: FC<LoginProps> = () => {

  const navigate = useNavigate()
  const authStore = useAuthStore((state) => state)

  const [showSR, setShowSR] = useState(false)

  const secretFieldRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const secret = formData.get('secret') as string
    if (secret) {
      if (isAuthenticated(secret)) {
        authStore.update(secret)
        navigate({ to: '/' })
      } else {
        alert('Sai gòi, gián điệp 🫵')
      }
    } else {
      alert('Nhâp sít rịt key đi pạn')
    }
  }

  const handleToggleShowSR = () => {
    setShowSR(!showSR)
  }
  return (
    <form className='fixed m-auto top-1/2 -translate-y-1/2 left-4 right-4 flex flex-col gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg ' onSubmit={handleSubmit}>
      <fieldset className='flex flex-col gap-2'>
        <label htmlFor='secret' className='w-fit px-3 py-0.5 text-sm bg-black/40 uppercase tracking-widest'>Sít rịt</label>
        <div className='flex items-center'>
          <input ref={secretFieldRef} id='secret' name='secret' type={showSR ? 'text' : 'password'} placeholder='Nhập sít rịt key đi pạn'
            className='flex-1 focus:outline-none text-lg py-2 text-center' />
          {showSR ?
            <EyeClosedIcon className='hover:cursor-pointer' onClick={handleToggleShowSR} />
            :
            <EyeIcon className='hover:cursor-pointer' onClick={handleToggleShowSR} />
          }
        </div>
      </fieldset>

      <button type='submit'
        className='px-6 py-2 text-lg bg-gradient-to-br from-indigo-900 to-fuchsia-800 rounded-lg hover:cursor-pointer 
          transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 
          inset-shadow-sm inset-shadow-indigo-500/50'>
        Dô
      </button>
    </form>
  )
}
