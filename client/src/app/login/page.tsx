'use client'
import React, {useState} from "react";
import Link from "next/link";

interface FormErrors{
    username?: string
    password?: string
}

function Login(){
    const [checked, setChecked] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<FormErrors>({})

    const togglePasswordVisibility = ()=>{
        if(checked){
            setChecked(false)
        }
        else{
            setChecked(true)
        }
    }

    const validateForm = ()=>{
        const errors: FormErrors = {}

        if(username.length<1){
            errors.username = 'Invalid value'
        }

        if(password.length<1){
            errors.password = 'Invalid value'
        }

        return errors
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        const errors = validateForm()

        if(Object.keys(errors).length != 0){
            e.preventDefault()
            setErrors(errors)
        }
    }

    return(
        <section className='flex flex-col items-center'>
            <h1 className='text-4xl font-bold mt-3'>Login</h1>
            <form onSubmit={handleSubmit} className='mt-5 w-64 flex flex-col items-center border border-gray-300 shadow-md p-6 rounded-lg'>
                <label className='block'>
                    <span className='text-gray-700'>Username</span>
                    {errors.username && <span className='text-red-700 text-sm float-right'>{errors.username}</span>}
                    <input type='text' onChange={(e)=>setUsername(e.target.value)}
                           className='mt-1 block w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 '/>
                </label>
                <div className='flex flex-col'>
                    <label className='block mt-4'>
                        <span className='text-gray-700'>Password</span>
                        {errors.password && <span className='text-red-700 text-sm float-right'>{errors.password}</span>}
                        <input type={checked? "text" : "password"}
                               onChange={(e)=>setPassword(e.target.value)}
                               className='mt-1 block w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'/>
                    </label>
                    <label>
                        <input type='checkbox' onChange={togglePasswordVisibility}/>
                        <span className='text-sm text-gray-600 pl-1'>Show password</span>
                    </label>
                    <p className='text-sm text-gray-400 inline self-end cursor-pointer'>Forgot password?</p>
                </div>
                <button className='mt-2 bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus::shadow-outline' type='submit'>Login</button>
            </form>

            <p className='mt-4 text-sm'>Don't have an account? <Link href='/register' className='text-brand-primary font-bold'>Sing up</Link></p>
        </section>
    )
}

export default Login