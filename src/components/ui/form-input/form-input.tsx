import { ChangeEventHandler, FC, HTMLInputTypeAttribute, useId } from "react"

interface FormInputProps {
  label?: string,
  type: HTMLInputTypeAttribute,
  value: string,
  placeholder?: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  readonly?: boolean,
}

export const FormInput: FC<FormInputProps> = ({ label, type, value, placeholder = "", onChange, readonly = false }) => {

  const id = useId()

  return (
    <fieldset className="grow flex flex-col gap-2">
      {label && <label htmlFor={`${id}-${label}`}>{label}</label>}
      <input
        id={`${id}-${label}`}
        className='focus:outline-none text-md p-2 rounded-md border border-white/30'
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={readonly} />
    </fieldset>
  )
}
