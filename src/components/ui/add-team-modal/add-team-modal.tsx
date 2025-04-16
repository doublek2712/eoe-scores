import { FC, useState } from 'react'
import { TeamCard } from '../team-card/team-card'
import { Team } from '../../../services/team/type'

const BLANK_TEAM_DATA: Team = {
  id: '',
  name: '',
  members: []
}


interface AddTeamModalProps {
  onAdd: (data: Team) => void,
  isOpen: boolean,
  setIsOpen: Function,
  validateFn: (data: Team) => boolean
}

export const AddTeamModal: FC<AddTeamModalProps> = ({ onAdd, isOpen, setIsOpen, validateFn }) => {
  const [data, setData] = useState<Team>(BLANK_TEAM_DATA)
  const handleTeamChange = (data: Team) => {
    if (!validateFn(data))
      return
    setData(data)
  }

  const handleAddTeam = () => {
    if (data.name === '') {
      alert('Tên nhóm không được trống')
      return
    }
    handleToggleModal()
    onAdd(data)
  }
  const handleCancel = () => {
    handleToggleModal()
  }

  const handleToggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`${isOpen ? 'flex' : 'hidden'} fixed z-50 top-0 bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md`} onClick={handleToggleModal}>
      <div className={`my-auto mx-4 w-full  h-fit max-h-full overflow-auto p-6 rounded-xl flex flex-col gap-4 bg-white/0`} onClick={(e) => e.stopPropagation()}>
        <span className='block text-center'>Thêm đội</span>
        <TeamCard initialData={data} onChange={handleTeamChange} />
        <div className="flex gap-2">
          <button
            className={`py-2 px-4 text-md hover:cursor-pointer text-center 
            bg-indigo-800  rounded-lg`}
            onClick={handleAddTeam}
          >
            Thêm
          </button>
          <button
            className={`py-2 px-4 text-md hover:cursor-pointer text-center 
            bg-rose-800  rounded-lg`}
            onClick={handleCancel}
          >
            Hủy
          </button>
        </div>
      </div >
    </div>

  )
}
