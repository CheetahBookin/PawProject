'use client'
import Label from '@/components/common/label'
import {useState} from 'react'
import LabelCheckbox from '../labelCheckbox'

interface PasswordInputProps{
    content: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    name: string
}

function PasswordInput({content, onChange, name}: PasswordInputProps){
    const [checked, setChecked] = useState(false)

    const togglePasswordVisibility = ()=>{
        if(checked){
            setChecked(false)
        }
        else{
            setChecked(true)
        }
    }


    return(
        <div className='flex flex-col w-full'>
            <Label inputType={checked ? 'text' : 'password'} spanContent={content} onChange={onChange} name={name} className='mt-1 block w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none text-gray-600'/>
            <LabelCheckbox content='Show password' onChange={togglePasswordVisibility} name={name}/>
        </div>
    )
}

export default PasswordInput