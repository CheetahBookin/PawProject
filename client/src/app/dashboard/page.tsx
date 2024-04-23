"use client"

import React, { useEffect, useState } from 'react'
import { getUser, logout, updateNickname } from '@/services/userService'
import { User } from '@/types/userTypes'
import { useUserContext } from '@/context/userContext'
import { useRouter } from 'next/navigation'
import Loading from '@/components/common/loading'
import { getUserProfile } from '@/services/userProfileService'
import { useToast } from '@/components/ui/use-toast'
import UserProfileForm from '@/components/layout/userProfileForm'
import { getFinishedUpcomingTrips, getMostVisitedDestination, nextTrip, userLevel } from '@/services/userDashboardService'
import { FinishedUpcomingTrips, Level, MostVisitedDestination, NextTrip, Opinions } from '@/types/dashboardTypes'
import { getUsersRates } from '@/services/ratingService'
import { getFavoritesHotels } from '@/services/favoritesService'
import { FavoritesHotels } from '@/types/favoritesTypes'
import UserData from '@/components/layout/userData'
import UserAchievements from '@/components/layout/userAchievements'
import ExecuteButtons from '@/components/layout/ExecuteButtons'

function Dashboard() {
  const router = useRouter()
  const { isLogged, setIsLogged } = useUserContext()
  const [user, setUser] = useState<User | null>(null)
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true)
  const [switchBtn, setSwitchBtn] = useState(false)
  const [finishedUpcomingTrips, setFinishedUpcomingTrips] = useState<FinishedUpcomingTrips | null>(null)
  const [mostVisitedDestination, setMostVisitedDestination] = useState<MostVisitedDestination | null>(null)
  const [nTrip, setNTrip] = useState<NextTrip | null>(null)
  const [level, setLevel] = useState<Level | null>(null)
  const [opinions, setOpinions] = useState<Opinions | null>(null)
  const [favorites, setFavorites] = useState<FavoritesHotels[]>([])
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
    country: '',
    address: '',
    profileImage: '',
    darkMode: false,
  })
  const [updateData, setUpdateData] = useState({
    nickname: '',
    email: '',
    newPassword: '',
    currPassword: '',
    phoneNumber: '',
  })
  const { toast } = useToast()
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try{
        const user = await getUser()
        if (user.status === 200) {
          document.title = `Dashboard - ${user.data.username}`
          setUser(user.data)
          setUpdateData({ ...updateData, nickname: user.data.username, email: user.data.email })
          if(user.data.phoneNumber){
            setUpdateData({ ...updateData, phoneNumber: user.data.phoneNumber })
          }
          setIsLogged(true)
          const finishedUpcomingTrips = await getFinishedUpcomingTrips(user.data.id)
          if (finishedUpcomingTrips?.status === 200) {
            setFinishedUpcomingTrips(finishedUpcomingTrips.data)
          }
          const mostVisitedDestination = await getMostVisitedDestination(user.data.id)
          if (mostVisitedDestination?.status === 200) {
            setMostVisitedDestination(mostVisitedDestination.data)
          }
          const upcomingTrip = await nextTrip(user.data.id)
          if (upcomingTrip?.status === 200) {
            setNTrip(upcomingTrip.data)
          }
          const level = await userLevel(user.data.id)
          if (level?.status === 200) {
            setLevel(level.data)
          }
          const opinions = await getUsersRates(user.data.id)
          if (opinions?.status === 200) {
            setOpinions(opinions.data)
          }
          const favorites = await getFavoritesHotels(user.data.id)
          if (favorites?.status === 200) {
            setFavorites(favorites.data)
          }
        } else {
          setIsLogged(false)
          router.push('/login')
        }
      }catch(err){
        console.log(err)
      }
    }
    fetchUser()
  }, [isLogged])

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

  return (
    <main className='bg-gray-100 text-black p-4 dark:bg-gray-500 w-full'>
      {loadingProfile ? (
        <Loading />
      ) : user ? (
        <section className="flex flex-col md:flex-row justify-center items-start gap-4 md:gap-8">
          <div className="w-full md:w-3/4 flex flex-col gap-4">
            <UserData finishedUpcomingTrips={finishedUpcomingTrips} mostVisitedDestination={mostVisitedDestination} nTrip={nTrip} user={user} userProfile={userProfile} />
            <UserAchievements level={level} opinions={opinions} favorites={favorites} />
          </div>
          <div className="w-full md:w-1/4">
            <UserProfileForm user={user} userProfile={userProfile} setUserProfile={setUserProfile} isChecked={isChecked} setIsChecked={setIsChecked} switchBtn={switchBtn}/>
            <ExecuteButtons user={user} setUser={setUser} setIsLogged={setIsLogged} setUpdateData={setUpdateData} updateData={updateData}/>
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </main>
  )
}

export default Dashboard
