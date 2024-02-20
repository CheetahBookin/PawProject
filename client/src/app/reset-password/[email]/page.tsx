"use client"

import Label from '@/components/common/label';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { resetPassword } from '@/services/userService';
import Loading from '@/components/common/loading';

type ResetPasswordData = {
    resetCode: string;
    password: string;
};

function ResetPass() {
  const router = useRouter();
  const pathname = usePathname();
  const email = pathname.split('/')[2];
  const [data, setData] = useState<ResetPasswordData>({
    resetCode: '',
    password: ''
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false); // State to manage password visibility

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
        ...data,
        [name]: value
    });
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try{
        setLoading(true)
        const response = await resetPassword(email, data.resetCode, data.password);
        if(response.status === 200){
            setError('')
            router.push('/login')
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
    <main className="h-full flex items-center justify-center bg-brand-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset Password</h2>
        </div>
        <form className="mt-8 space-y-6">
            <Label 
                inputType='text' 
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500 text-gray-700" 
                placeholder='Reset Code' 
                noLabel={true} 
                name="resetCode"
                onChange={(e) => handleChange(e)}
            />
            <div className="relative">
                <Label 
                    inputType={showPassword ? 'text' : 'password'}
                    className="border border-gray-300 rounded-md pl-4 pr-12 py-2 w-full focus:outline-none focus:border-indigo-500 text-gray-700" 
                    placeholder='New Password' 
                    noLabel={true} 
                    name="password"
                    onChange={(e) => handleChange(e)}
                />
                <button 
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-600 cursor-pointer"
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? 'Hide' : 'Show'}
                </button>
            </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none outline-none"
            onClick={e => handleSubmit(e)}
          >
            {loading ? <Loading /> : 'Reset Password'}
          </button>
          <p className="text-center text-indigo-500 text-sm mt-4">{error}</p>
        </form>
      </div>
    </main>
  );
}

export default ResetPass;
