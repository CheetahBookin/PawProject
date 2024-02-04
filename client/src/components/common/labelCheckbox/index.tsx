interface LabelCheckboxProps {
    content: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    important?: boolean
    name: string
}

function LabelCheckbox({content, onChange, important, name}: LabelCheckboxProps) {
  return (
    <label>
      <input type='checkbox' onChange={onChange} name={name}/>
      <span className={important ? 'text-gray-700 pl-1' : 'text-sm text-gray-700 pl-1'}>{content}</span>
    </label>
  )
}

export default LabelCheckbox
