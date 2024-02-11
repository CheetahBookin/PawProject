"use client"

import React, { useEffect } from 'react'
import { getUser, logout } from '@/services/userService'
import { useState } from 'react'
import { User } from '@/types/userTypes'
import { useUserContext } from '@/Context/userContext'
import { useRouter } from 'next/navigation'
import Loading from '@/components/common/loading'

function Dashboard() {
  const router = useRouter()
  const { setIsLogged } = useUserContext()
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    const fetchUser = async () => {
        const user = await getUser()
        if(user.status === 200) {
          setUser(user.data)
          setIsLogged(true)
        }else{
          setIsLogged(false)
          router.push('/login')
        }
    }
    fetchUser()
  }, [])

  const executeLogout = async() => {
    const response = await logout()
    if(response.status === 200) {
      setUser(null)
      setIsLogged(false)
      router.push(response.data.redirectTo)
    }
  }
  return (
    <main className="bg-brand-secondary h-full text-black">
      {user ? 
      <>
        <h1>Dashboard</h1>
        <p>Welcome {user?.username}</p>
        <button className="bg-brand-primary text-white px-4 py-2 rounded-md" onClick={executeLogout}>Logout</button>
      </>
      : <Loading />}
    </main>
  )
}

export default Dashboard
