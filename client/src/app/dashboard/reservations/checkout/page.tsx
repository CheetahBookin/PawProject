"use client"

import { useUserContext } from '@/context/userContext';
import { getUser } from '@/services/userService';
import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { User } from '@/types/userTypes';
import { useRouter, useSearchParams } from 'next/navigation';
import { checkout } from '@/services/paymentService';
import Loading from '@/components/common/loading';

function Checkout(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [user, setUser] = useState<User>({} as User);
  const { isLogged, setIsLogged } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        if (userData.status === 200) {
          setUser(userData.data);
          setIsLogged(true);
        } else {
          setIsLogged(false);
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchUser();
  }, [isLogged]);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePayment = async(e: FormEvent) => {
    e.preventDefault();
    const mail = email
    const userId = user.id
    const orderParams = searchParams.get('order')
    const orderId = Number(orderParams) as number
    try{
      setLoading(true);
      const response = await checkout(orderId, mail, userId);
      if(response.status === 200){
        router.push(response.data.url)
      } else {
        console.log(response.data.error)
      }
    }catch(error: any){
      console.log(error)
    }finally{
      setLoading(false);
    }
  };

  return (
    <main className="h-full flex flex-col justify-center items-center bg-brand-secondary">
        <div className="bg-brand-primary p-8 rounded-lg">
            <h1 className="text-3xl font-semibold mb-8">Checkout</h1>
            <form onSubmit={handlePayment} className="w-full">
                <div className="mb-4">
                <label htmlFor="email" className="block mb-2 font-semibold text-white">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    required
                />
                </div>
                <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                {loading ? <Loading /> : "Pay"}
                </button>
            </form>
        </div>
    </main>
  );
}

export default Checkout;
