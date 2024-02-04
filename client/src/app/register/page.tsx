"use client"

import React from 'react'
import Link from 'next/link'
import Label from '@/components/common/label'
import PasswordInput from '@/components/common/passwordInput'
import LabelCheckbox from '@/components/common/labelCheckbox'
import { RegisterData } from '@/types/authTypes' 

function RegisterSite(){
    const [data, setData] = React.useState<RegisterData>({
        email: '',
        username: '',
        agreement: false,
        password: '',
        confirmPassword: ''
    })
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, checked, type} = e.target
        setData({
            ...data,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log(data)
    }
    return(
        <section className='flex flex-col items-center h-full justify-center bg-brand-secondary'>
            <h1 className='text-4xl font-bold text-gray-600'>Sign up</h1>
            <form className='mt-5 w-80 flex flex-col items-center border border-gray-300 shadow-md p-6 rounded-lg bg-brand-primary'>
                <Label inputType={'email'} spanContent={'Email'} onChange={e=>handleChange(e)} name={'email'}/>
                <Label inputType={'text'} spanContent={'Username'} onChange={e=>handleChange(e)} name={'username'}/>
                <LabelCheckbox content='I agree to the terms and conditions' onChange={e=>handleChange(e)} important={true} name={'agreement'}/>
                <PasswordInput content={'Password'} onChange={e=>handleChange(e)} name={'password'}/>
                <PasswordInput content={'Confirm Password'} onChange={e=>handleChange(e)} name={'confirmPassword'}/>
                <button className='mt-2 bg-brand-secondary hover:bg-brand-primary transition-all text-gray-600 font-bold py-2 px-4 rounded focus:outline-none focus::shadow-outline' onClick={e=>handleSubmit(e)}>Sign up</button>
            </form>
            <p className='mt-4 text-sm text-gray-600'>Already have an account? <Link href='/login' className='text-brand-primary font-bold'>Login here</Link></p>
        </section>
    )
}

export default RegisterSite