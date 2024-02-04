import React from 'react'
import Link from "next/link";

function RegisterSite(){
    return(
        <section className='flex flex-col items-center'>
            <h1 className='text-4xl font-bold mt-3'>Sign up</h1>
            <form className='mt-5 w-64 flex flex-col items-center border border-gray-300 shadow-md p-6 rounded-lg'>
                <label className='block'>
                    <span className='text-gray-700'>First Name</span>
                    <input type='text'
                           className='mt-1 block w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 '/>
                </label>
                <label>
                    <span>Last Name</span>
                    <input type='text'/>
                </label>
                <label>
                    Address
                    <input type='text'/>
                </label>
                <label>
                    User name
                    <input type='text'/>
                </label>
                <label>
                    Password
                    <input type='password'/>
                </label>
                <label>
                    Confirm Password
                    <input type='password'/>
                </label>

                <button>Sign up</button>
            </form>
            <p>Already have an account? <Link href='/login'>Login here</Link></p>
        </section>
    )
}

export default RegisterSite