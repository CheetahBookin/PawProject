"use client"

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getUser } from "@/services/userService";
import { User } from "@/types/userTypes";
import { useUserContext } from "@/context/userContext";
import Loading from "@/components/common/loading";

function Header() {
  const { isLogged, setIsLogged } = useUserContext();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await getUser();
        if(userData.status === 200){
          setUser(userData.data)
          setIsLogged(true)
        }else{
          setIsLogged(false)
        }
      } catch (error: any) {
        console.log(error)
      }finally{
        setLoading(false)
      }
    };
    fetchUser();
  }, [isLogged]);

  const currency = [
    { value: "PLN", label: "PLN" },
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
    { value: "GBP", label: "GBP" },
    { value: "AUD", label: "AUD" },
    { value: "CAD", label: "CAD" },
    { value: "JPY", label: "JPY" },
    { value: "CNY", label: "CNY" },
    { value: "KRW", label: "KRW" },
    { value: "SGD", label: "SGD" }
  ];

  return (
    <header className="lg:px-16 flex py-4 shadow-md justify-between bg-brand-primary items-center">
      <Link href="/">
          <img src="/cheetahbooking-high-resolution-logo.png" alt="logo" className="w-56" />
      </Link>
      <nav className="flex-1 flex justify-end">
        <div className="hidden md:flex md:items-center md:w-auto w-full" id="menu">
          <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0 gap-12">
            {isLogged && <li>{!loading ? <p>Welcome on your adventure {user?.username}!</p> : <Loading />}</li>}
            <li><Link className="block" href="/offer">Our offer</Link></li>
            <li><Link className="block" href="/about">About</Link></li>
            <li><Link className="block" href="/destinations">Destinations</Link></li>
            <li>
              <select className="appearance-none bg-brand-secondary border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                {currency.map((item, index) => (
                  <option key={index} value={item.value}>{item.label}</option>
                ))}
              </select>
            </li>
            {!loading ? <li>{!isLogged ? <Link className="block" href="/login"><FontAwesomeIcon icon={faUser} className="w-12 h-6"/></Link> : 
              <Link className="block" href="/dashboard">
                <img
                  src="https://placehold.it/50x50"
                  alt="Profile"
                  className="w-full h-full object-cover border-r-2 border-brand-secondary rounded-full"
                />
              </Link>}
            </li> : <Loading />}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
