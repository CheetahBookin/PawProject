"use client"

import { useState, FormEvent, ChangeEvent, useEffect} from 'react'
import Link from 'next/link'
import Label from '@/components/common/label'
import PasswordInput from '@/components/common/passwordInput'
import LabelCheckbox from '@/components/common/labelCheckbox'
import { RegisterData } from '@/types/authTypes' 
import { register, login } from '@/services/authService'
import { useRouter } from 'next/navigation'
import Loading from '@/components/common/loading'
import { useUserContext } from '@/context/userContext'

function Register(){
    const router = useRouter()
    const { setIsLogged } = useUserContext()
    const [data, setData] = useState<RegisterData>({
        email: '',
        username: '',
        agreement: false,
        password: '',
        confirmPassword: ''
    })

    useEffect(() => {
        document.title = 'Register'
    }, [])

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value, checked, type} = e.target
        setData({
            ...data,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setLoading(true)
        try{
            const response = await register(data.email, data.username, data.agreement, data.password, data.confirmPassword)
            if(response && response.status === 201) {
                const response = await login(data.email, data.password)
                if(response && response.status === 200) {
                    setIsLogged(true)
                    router.push('/')
                }else{
                    setIsLogged(false)
                }
            }
            else {
                const error = response.data.error
                if(typeof error === 'string') {
                    setError(error)
                }else{
                    setError("Something went wrong")
                }
            }
        } catch (err: any) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
    return(
        <section className='flex flex-col items-center h-full justify-center bg-brand-secondary'>
            <h1 className='text-4xl font-bold text-gray-600'>Sign up</h1>
            <form className='mt-5 w-80 flex flex-col items-center border border-gray-300 shadow-md p-6 rounded-lg bg-brand-primary'>
                <Label inputType={'email'} spanContent={'Email'} onChange={e=>handleChange(e)} name={'email'} className='mt-1 block w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none text-gray-600'/>
                <Label inputType={'text'} spanContent={'Username'} onChange={e=>handleChange(e)} name={'username'} className='mt-1 block w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none text-gray-600'/>
                <LabelCheckbox content='' onChange={e=>handleChange(e)} important={true} name={'agreement'} terms={true}/>
                <PasswordInput content={'Password'} onChange={e=>handleChange(e)} name={'password'}/>
                <PasswordInput content={'Confirm Password'} onChange={e=>handleChange(e)} name={'confirmPassword'}/>
                <button className='mt-2 bg-brand-secondary hover:bg-brand-primary transition-all text-gray-600 font-bold py-2 px-4 rounded focus:outline-none focus::shadow-outline' onClick={e=>handleSubmit(e)}>{loading ? <Loading /> : "Sign up"}</button>
                {error && <p className='text-red-500 mt-2'>{error}</p>}
            </form>
            <p className='mt-4 text-sm text-gray-600'>Already have an account? <Link href='/login' className='text-brand-primary font-bold'>Login here</Link></p>
        </section>
    )
}

export default Register