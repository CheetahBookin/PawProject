'use client'
import Label from '@/components/common/label'
import {useState} from 'react'

function PasswordInput(){
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
            <Label inputType={checked ? 'text' : 'password'} spanContent={'Password'}/>
            <label>
                <input type='checkbox' onChange={togglePasswordVisibility}/>
                <span className='text-sm text-gray-600 pl-1'>Show password</span>
            </label>
        </div>
    )
}

export default PasswordInput