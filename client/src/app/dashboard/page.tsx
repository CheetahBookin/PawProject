"use client"

import React, { useEffect, useState } from 'react'
import { getUser, logout } from '@/services/userService'
import { User } from '@/types/userTypes'
import { useUserContext } from '@/context/userContext'
import { useRouter } from 'next/navigation'
import Loading from '@/components/common/loading'
import Link from 'next/link'
import { getUserProfile } from '@/services/userProfileService'
import { useToast } from '@/components/ui/use-toast'
import UserProfileForm from '@/components/layout/userProfileForm'

function Dashboard() {
  const router = useRouter()
  const { setIsLogged } = useUserContext()
  const [user, setUser] = useState<User | null>(null)
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true)
  const [switchBtn, setSwitchBtn] = useState(false)
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
    country: '',
    address: '',
    profileImage: '',
    darkMode: false,
  })
  const { toast } = useToast()
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser()
      if (user.status === 200) {
        document.title = `Dashboard - ${user.data.username}`
        setUser(user.data)
        setIsLogged(true)
      } else {
        setIsLogged(false)
        router.push('/login')
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    const loadUserProfile = async () => {
      if (user) {
        const userProfileData = await getUserProfile(user.id)
        if (userProfileData.status === 200) {
          setUserProfile(userProfileData.data)
          setLoadingProfile(false)
          setIsChecked(userProfileData.data.darkMode)
          setSwitchBtn(false)
        } else {
          setLoadingProfile(false)
          toast({
            title: 'Error',
            description: 'Please complete your profile information',
            variant: 'destructive',
          })
          setSwitchBtn(true)
        }
      }
    }
    loadUserProfile()
  }, [user])

  const executeLogout = async () => {
    const response = await logout()
    if (response.status === 200) {
      setUser(null)
      setIsLogged(false)
      router.push(response.data.redirectTo)
    }
  }

  return (
    <main className='bg-gray-100 text-black flex flex-col items-start min-h-screen p-4 dark:bg-gray-500'>
      {loadingProfile ? (
        <Loading />
      ) : user ? (
        <>
          <h1 className='text-3xl font-bold mb-4'>Dashboard</h1>
          <p className='mb-2'>Welcome, <span className='font-bold'>{user.username}</span>!</p>
          <UserProfileForm user={user} userProfile={userProfile} setUserProfile={setUserProfile} isChecked={isChecked} setIsChecked={setIsChecked} switchBtn={switchBtn}/>
          <Link href='/dashboard/reservations' className='text-blue-500 hover:text-blue-700'>Your reservations</Link>
          <button
            onClick={executeLogout}
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline'
          >
            Logout
          </button>
        </>
      ) : (
        <Loading />
      )}
    </main>
  )
}

export default Dashboard
