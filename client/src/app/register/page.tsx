"use client"

import React from 'react'
import Link from 'next/link'
import Label from '@/components/common/label'
import PasswordInput from '@/components/common/passwordInput'
import LabelCheckbox from '@/components/common/labelCheckbox'
import { RegisterData } from '@/types/authTypes' 
import { register } from '@/services/authService'

function RegisterSite(){
    const [data, setData] = React.useState<RegisterData>({
        email: '',
        username: '',
        agreement: false,
        password: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string>('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, checked, type} = e.target
        setData({
            ...data,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setLoading(true)
        try{
            const response = await register(data.email, data.username, data.agreement, data.password, data.confirmPassword)
            if(response.status === 201) console.log('User registered successfully')
            else console.log(response.data.message)
        } catch (err: any) {
            setError(err.response.data.error)
        } finally {
            setLoading(false)
        }

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
                <button className='mt-2 bg-brand-secondary hover:bg-brand-primary transition-all text-gray-600 font-bold py-2 px-4 rounded focus:outline-none focus::shadow-outline' onClick={e=>handleSubmit(e)}>{loading ? "loading" : "Sign up"}</button>
                {error && <p className='text-red-500 mt-2'>{error}</p>}
            </form>
            <p className='mt-4 text-sm text-gray-600'>Already have an account? <Link href='/login' className='text-brand-primary font-bold'>Login here</Link></p>
        </section>
    )
}

export default RegisterSite