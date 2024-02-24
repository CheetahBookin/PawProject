"use client"

import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { getUser } from '@/services/userService';
import { useUserContext } from '@/context/userContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { checkPaymentStatus } from '@/services/paymentService';

function Success() {
  const { setIsLogged } = useUserContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDataFetched = useRef(false);
  const [counter, setCounter] = useState(10);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        if (userData.status === 200) {
          setIsLogged(true);
          const orderParams = searchParams.get('orderId')
          const orderId = Number(orderParams) as number
          const response = await checkPaymentStatus(orderId)
          if(response.status === 200){
            const interval = setInterval(() => {
              setCounter((prev) => {
                if (prev === 0) {
                  clearInterval(interval);
                  router.push('/dashboard/reservations');
                  return prev;
                }
                return prev - 1;
              });
            }, 1000);
          } else {
            console.log(response)
          }
          isDataFetched.current = true;
        } else {
          setIsLogged(false);
          router.push('/login');
        }
      } catch (error: any) {
        console.log(error);
      }
    }
    if(!isDataFetched.current) {
      fetchUser();
    }

    return () => {
      isDataFetched.current = false;
      clearInterval(counter);
    }
  }, []);
  return (
    <main className='flex items-center justify-center h-screen bg-brand-secondary'>
      <div className='bg-white p-8 rounded-lg shadow-md'>
        <div className='text-center text-green-500'>
          <FontAwesomeIcon icon={faCheckCircle} className='text-5xl mb-4' />
          <h1 className='text-3xl font-bold text-gray-800 mb-4'>Payment successful!</h1>
          <p className='text-lg text-gray-700'>Thank you for booking our hotel!</p>
          <p className='text-lg text-gray-700'>In {counter}s you'll come back to reservations.</p>
        </div>
      </div>
    </main>
  );
}

export default Success;
