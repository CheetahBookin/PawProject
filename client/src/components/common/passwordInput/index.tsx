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
            <Label inputType={checked ? 'text' : 'password'} spanContent={content} onChange={onChange} name={name}/>
            <LabelCheckbox content='Show password' onChange={togglePasswordVisibility} name={name}/>
        </div>
    )
}

export default PasswordInput