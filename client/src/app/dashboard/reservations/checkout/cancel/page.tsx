"use client"

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

function Cancel() {
  const [counter, setCounter] = useState(10);
  const router = useRouter();

  useEffect(() => {
    document.title = 'Payment Cancelled';
    const countdown = setInterval(() => {
      setCounter((prev) => {
        if (prev === 0) {
          clearInterval(countdown);
          router.push('/dashboard/reservations');
          return prev;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);
  return (
    <main className='flex items-center justify-center h-screen bg-brand-secondary'>
      <div className='bg-white p-8 rounded-lg shadow-md'>
        <div className='text-center text-red-600'>
          <FontAwesomeIcon icon={faCircleXmark} className='text-5xl mb-4' />
          <h1 className='text-3xl font-bold text-gray-800 mb-4'>Payment cancelled!</h1>
          <p className='text-lg text-gray-700'>The fuck you doin' bruh!</p>
          <p className='text-lg text-gray-700'>In {counter}s you'll come back to reservations.</p>
        </div>
      </div>
    </main>
  );
}

export default Cancel;
