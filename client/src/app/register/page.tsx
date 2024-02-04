import React from 'react'
import Link from 'next/link'
import Label from '@/components/common/label'
import PasswordInput from '@/components/common/passwordInput'


function RegisterSite(){
    return(
        <section className='flex flex-col items-center h-full justify-center'>
            <h1 className='text-4xl font-bold'>Sign up</h1>
            <form className='mt-5 w-80 flex flex-col items-center border border-gray-300 shadow-md p-6 rounded-lg'>
                <Label inputType={'text'} spanContent={'First name'}/>
                <Label inputType={'text'} spanContent={'Last name'}/>
                <Label inputType={'text'} spanContent={'Address'}/>
                <Label inputType={'text'} spanContent={'Username'}/>
                <PasswordInput/>

                <button className='mt-2 bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus::shadow-outline'>Sign up</button>
            </form>
            <p className='mt-4 text-sm'>Already have an account? <Link href='/login' className='text-brand-primary font-bold'>Login here</Link></p>
        </section>
    )
}

export default RegisterSite