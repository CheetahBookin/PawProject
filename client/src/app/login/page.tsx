'use client'
import React from 'react'
import Link from 'next/link'
import Label from '../../components/common/label'
import PasswordInput from '@/components/common/passwordInput'

interface FormErrors{
    username?: string
    password?: string
}

function Login(){
    return(
        <section className='flex flex-col items-center h-full justify-center'>
            <h1 className='text-4xl font-bold'>Login</h1>
            <form className='mt-5 w-64 flex flex-col items-center border border-gray-300 shadow-md p-6 rounded-lg'>
                <Label inputType={'text'} spanContent={'Username'}/>

                <div className='flex flex-col'>
                    <PasswordInput/>
                    <p className='text-sm text-gray-400 inline self-end cursor-pointer'>Forgot password?</p>
                </div>

                <button className='mt-2 bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus::shadow-outline'>Login</button>
            </form>

            <p className='mt-4 text-sm'>Don't have an account? <Link href='/register' className='text-brand-primary font-bold'>Sing up</Link></p>
        </section>
    )
}

export default Login