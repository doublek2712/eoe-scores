import { useNavigate } from '@tanstack/react-router'
import meme from '../assets/not-allow-meme.webp'

export const NotAllowed = () => {
  const navigate = useNavigate()
  const handleBackToHome = () => {
    navigate({ to: '/' })
  }
  return (
    <div className='flex flex-col items-center justify-center'>
      <span className='text-lg my-4'>Ai cho dô mà dô, ra đi</span>
      <button className='px-6 py-2 text-lg bg-gradient-to-br from-indigo-900 to-fuchsia-800 rounded-lg hover:cursor-pointer 
          transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 
          inset-shadow-sm inset-shadow-indigo-500/50' onClick={handleBackToHome}>Về trang chủ</button>
      <img className='mt-6' src={meme} alt='not allowed meme' />
    </div>
  )
}
