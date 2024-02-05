'use client'
import React from 'react'
import Link from 'next/link'
import Label from '../../components/common/label'
import PasswordInput from '@/components/common/passwordInput'
import { LoginData } from '@/types/authTypes'
import { login } from '@/services/authService'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function Login(){
    const [data, setData] = useState<LoginData>({
        email: '',
        password: ''
    })

    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try{
            const response = await login(data.email, data.password)
            if(response.status === 200){
                router.push('/')
            }
        }catch(err: any){
            console.log(err.response.data.error)
        }
    }
    return(
        <section className='flex flex-col items-center h-full justify-center bg-brand-secondary'>
            <h1 className='text-4xl font-bold text-gray-600'>Login</h1>
            <form className='mt-5 w-64 flex flex-col items-center border border-gray-300 shadow-md p-6 rounded-lg bg-brand-primary'>
                <Label inputType={'email'} spanContent={'Email'} onChange={e=>handleChange(e)} name={'email'}/>

                <div className='flex flex-col'>
                    <PasswordInput content={'Password'} onChange={e=>handleChange(e)} name={'password'}/>
                    <p className='text-sm text-gray-600 inline self-end cursor-pointer'>Forgot password?</p>
                </div>

                <button className='mt-2 bg-brand-secondary hover:bg-brand-primary transition-all text-gray-600 font-bold py-2 px-4 rounded focus:outline-none focus::shadow-outline' onClick={e=>handleSubmit(e)}>Login</button>
            </form>

            <p className='mt-4 text-sm text-gray-600'>Don't have an account? <Link href='/register' className='text-brand-primary font-bold'>Sign up</Link></p>
        </section>
    )
}

export default Login