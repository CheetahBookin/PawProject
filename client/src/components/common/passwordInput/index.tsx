'use client'

import Label from '@/components/common/label';
import { useState } from 'react';

interface PasswordInputProps {
    content: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
}

function PasswordInput({ content, onChange, name }: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='flex flex-col w-full relative'>
            <Label
                inputType={showPassword ? 'text' : 'password'}
                spanContent={content}
                onChange={onChange}
                name={name}
                className='mt-1 block w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none text-gray-600 pr-12'
            />
            <button
                type="button"
                className="absolute inset-y-12 right-0 flex items-center pr-3 text-sm text-gray-600 cursor-pointer"
                onClick={togglePasswordVisibility}
            >
                {showPassword ? 'Hide' : 'Show'}
            </button>
        </div>
    );
}

export default PasswordInput;
