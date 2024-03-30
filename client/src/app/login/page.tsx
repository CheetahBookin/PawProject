'use client'

import Link from 'next/link'
import Label from '../../components/common/label'
import PasswordInput from '@/components/common/passwordInput'
import { LoginData } from '@/types/authTypes'
import { login } from '@/services/authService'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useUserContext } from '@/context/userContext'
import Loading from '@/components/common/loading'

function Login(){
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const { setIsLogged } = useUserContext()
    const [data, setData] = useState<LoginData>({
        email: '',
        password: ''
    })

    useEffect(() => {
        document.title = 'Login'
    }, [])

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
        setLoading(true)
        try{
            const response = await login(data.email, data.password)
            if(response.status === 200){
                setIsLogged(true)
                router.push('/')
            }else{
                setIsLogged(false)
                const error = response.data.error
                if(typeof error === 'string'){
                    setError(error)
                }else{
                    setError('Something went wrong')
                }
            }
        }catch(err: any){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }
    return(
        <section className='flex flex-col items-center h-full justify-center bg-brand-secondary'>
            <h1 className='text-4xl font-bold text-gray-600'>Login</h1>
            <form className='mt-5 w-64 flex flex-col items-center border border-gray-300 shadow-md p-6 rounded-lg bg-brand-primary'>
                <Label inputType={'email'} spanContent={'Email'} onChange={e=>handleChange(e)} name={'email'} className='mt-1 block w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none text-gray-600'/>

                <div className='flex flex-col'>
                    <PasswordInput content={'Password'} onChange={e=>handleChange(e)} name={'password'}/>
                    <Link href='/reset-password' className='text-sm text-gray-600 inline self-end cursor-pointer'>Forgot password?</Link>
                </div>

                <button className='mt-2 bg-brand-secondary hover:bg-brand-primary transition-all text-gray-600 font-bold py-2 px-4 rounded focus:outline-none focus::shadow-outline' onClick={e=>handleSubmit(e)}>{loading ? <Loading /> : "Login"}</button>
                {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
            </form>

            <p className='mt-4 text-sm text-gray-600'>Don't have an account? <Link href='/register' className='text-brand-primary font-bold'>Sign up</Link></p>
        </section>
    )
}

export default Login