import { FC, useState } from 'react'
import { Team } from '../../../services/team/type'
import { FormInput } from '../form-input/form-input'


interface TeamCardProps {
  initialData: Team,
  onChange: (data: Team) => void
}

export const TeamCard: FC<TeamCardProps> = ({ initialData, onChange }) => {
  const [editData, setEditData] = useState<Team>(initialData)

  const handleChangeTeamName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData(prev => ({ ...prev, name: e.target.value }))
  }

  const handleMemberChange = (index: number, value: string) => {
    setEditData(prev => {
      const updatedMembers = [...prev.members]
      updatedMembers[index] = { ...updatedMembers[index], name: value }
      return { ...prev, members: updatedMembers }
    })
  }

  const handleAddMember = () => {
    setEditData(prev => ({
      ...prev,
      members: [...prev.members, { name: 'New member' }]
    }))
  }

  const handleRemoveMember = (index: number) => {
    setEditData(prev => ({
      ...prev,
      members: editData.members.filter((_, i) => i !== index),
    }))
  }

  const handleSaveChange = () => {
    if (editData.name === '') {
      alert('Tên nhóm không được trống')
      return
    }
    onChange(editData)
  }

  return (
    <div className='p-4 rounded-xl bg-white/10 flex flex-col gap-4' >
      <FormInput
        type="text"
        value={editData.name}
        placeholder="Tên nhóm"
        onChange={handleChangeTeamName}
      />

      <div>
        <span className='block my-2'>Thành viên</span>
        <ul className='flex flex-col gap-2'>
          {editData.members.map((member, index) => (
            <li key={index} className='flex gap-2'>
              <FormInput
                type="text"
                value={member.name}
                placeholder="Tên thành viên"
                onChange={(e) => handleMemberChange(index, e.target.value)}
              />
              <button
                className='rounded-lg py-2 px-4 bg-rose-600/60 hover:cursor-pointer'
                onClick={() => handleRemoveMember(index)}>
                X
              </button>
            </li>
          ))}
          <li>
            <button
              className='w-full p-2 text-md hover:cursor-pointer text-center border border-indigo-800 rounded-lg'
              onClick={handleAddMember}
            >Thêm thành viên</button>
          </li>
        </ul>
      </div>

      <div className='flex gap-4'>
        <button
          className={`py-2 px-4 text-md hover:cursor-pointer text-center 
            ${JSON.stringify(editData) === JSON.stringify(initialData) ? 'bg-indigo-800/40 text-white/40' : 'bg-indigo-800'}  rounded-lg`}
          disabled={JSON.stringify(editData) === JSON.stringify(initialData)}
          onClick={handleSaveChange}
        >
          Lưu
        </button>
        <button
          className={`py-2 px-4 text-md hover:cursor-pointer text-center border
            ${JSON.stringify(editData) === JSON.stringify(initialData) ? 'border-indigo-800/40 text-indigo-800/40' : 'border-indigo-800'}  rounded-lg`}
          disabled={JSON.stringify(editData) === JSON.stringify(initialData)}
          onClick={() => setEditData(initialData)}
        >
          Bỏ thay đổi
        </button>
      </div>
    </div>
  )
}
