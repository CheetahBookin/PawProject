"use client"

import Label from '@/components/common/label';
import { forgotPassword } from '@/services/userService';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/common/loading';

type ResetPasswordData = {
    email: string;
};

function ResetPassword() {
  const router = useRouter();
  const [data, setData] = useState<ResetPasswordData>({
    email: ''
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try{
        setLoading(true)
        const response = await forgotPassword(data.email);
        if(response.status === 200){
            setError('')
            router.push(`/reset-password/${data.email}`)
        }else{
            setError(response.data.error)
        }
    }catch(err: any){
        console.log(err)
    }finally{
        setLoading(false)
    }
  }
  return (
    <main className="flex justify-center items-center h-screen bg-brand-secondary">
      <div className="bg-brand-primary p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
        <form>
          <div className="mb-4">
            <Label 
                spanContent='Email' 
                inputType='email'
                name='email'
                className='mt-1 block w-full rounded-md py-2 px-3 focus:outline-none text-gray-600 border border-gray-600'
                onChange={(e) => handleChange(e)}
                />
          </div>
          <p className="text-indigo-500 text-sm mb-4">{error}</p>
          <button
            type="submit"
            className="w-full bg-white text-gray-600 py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            onClick={(e) => handleSubmit(e)}
          >
            {loading ? <Loading /> : 'Send reset code'}
          </button>
        </form>
      </div>
    </main>
  );
}

export default ResetPassword;
