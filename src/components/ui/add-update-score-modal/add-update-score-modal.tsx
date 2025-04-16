import { ChangeEvent, FC, useState } from "react"
import { FormInput } from "../form-input/form-input"


interface AddOrUpdateScoreModalProps {
  initialData?: number
  onAdd: (data: number) => void,
  isOpen: boolean,
  setIsOpen: Function
}
export const AddOrUpdateScoreModal: FC<AddOrUpdateScoreModalProps> = ({ initialData, onAdd, isOpen, setIsOpen }) => {
  const [data, setData] = useState<number>(initialData || 0)
  const handleChangeScore = (event: ChangeEvent<HTMLInputElement>) => {
    setData(Number(event.target.value))
  }
  const handleAddScore = () => {
    handleToggleModal()
    onAdd(data)
  }
  const handleCancel = () => {
    setData(initialData || 0)
    handleToggleModal()
  }

  const handleToggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`${isOpen ? 'flex' : 'hidden'} fixed z-50 top-0 bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md`} onClick={handleToggleModal}>
      <div className={`my-auto mx-4 w-full  h-fit max-h-full overflow-auto p-6 rounded-xl flex flex-col gap-4 bg-white/0`} onClick={(e) => e.stopPropagation()}>
        <span className='block text-center'>Điểm</span>
        <FormInput
          type='number'
          value={data.toString()}
          onChange={handleChangeScore}
        />
        <div className="flex gap-2">
          <button
            className={`py-2 px-4 text-md hover:cursor-pointer text-center 
              bg-indigo-800  rounded-lg`}
            onClick={handleAddScore}
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
