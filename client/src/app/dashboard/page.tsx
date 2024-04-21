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
import InfoProfileBox from '@/components/common/infoProfileBox'
import UserBlocks from '@/components/common/userBlocks'
import { getFinishedUpcomingTrips, getMostVisitedDestination, nextTrip, userLevel } from '@/services/userDashboardService'
import { FinishedUpcomingTrips, Level, MostVisitedDestination, NextTrip, Opinions } from '@/types/dashboardTypes'
import { getUsersRates } from '@/services/ratingService'

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
      try{
        const user = await getUser()
        if (user.status === 200) {
          document.title = `Dashboard - ${user.data.username}`
          setUser(user.data)
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

  const executeLogout = async () => {
    const response = await logout()
    if (response.status === 200) {
      setUser(null)
      setIsLogged(false)
      router.push(response.data.redirectTo)
    }
  }

  const getImageFromLevel = (level: string) => {
    switch (level) {
      case "Rookie":
        return '/levels/rookie.png'
      case "Starter":
        return '/levels/starter.png'
      case "Captain":
        return '/levels/captain.png'
      case "Legend":
        return '/levels/legend.png'
      case "Hall Of Famer":
        return '/levels/hof.png'
    }
  }

  return (
    <main className='bg-gray-100 text-black p-4 dark:bg-gray-500 w-full'>
      {loadingProfile ? (
        <Loading />
      ) : user ? (
        <section className="flex flex-col md:flex-row justify-center items-start gap-4 md:gap-8">
          <div className="w-full md:w-3/4 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-3/4 md:w-30% flex flex-col gap-8 items-center bg-white shadow-lg rounded-lg justify-center">
                <p className='mb-2'>Welcome, <span className='font-bold'>{user.username}</span>!</p>
                <img
                  src={userProfile.profileImage || '/assets/profile.webp'}
                  alt='Profile'
                  className='w-3/4 h-56 rounded-full mb-4 cursor-pointer'
                />
              </div>
              <div className="w-full md:w-70% flex flex-wrap justify-center items-center gap-8 h-[40vh]">
                <InfoProfileBox text='Finished trips'>
                  <p>{finishedUpcomingTrips ? finishedUpcomingTrips.finished : "0"}</p>
                </InfoProfileBox>
                <InfoProfileBox text='Upcoming trips'>
                  <p>{finishedUpcomingTrips ? finishedUpcomingTrips.upcoming : "0"}</p>
                </InfoProfileBox>
                <InfoProfileBox text='Most visited'>
                  {mostVisitedDestination ? (
                    <div>
                      <p>City: {mostVisitedDestination.mostVisitedCity.city}, {mostVisitedDestination.mostVisitedCity.count} times</p>
                      <p>Country: {mostVisitedDestination.mostVisitedCountry.country}, {mostVisitedDestination.mostVisitedCountry.count} times</p>
                    </div>
                  ) : (
                    <p>No data</p>
                  )}
                </InfoProfileBox>
                <InfoProfileBox text='Next trip'>
                  {nTrip ? (
                    <div>
                      <p>Hotel: {nTrip.hotel[0].name}</p>
                      <p>City: {nTrip.hotel[0].city}</p>
                      <p>Country: {nTrip.hotel[0].country}</p>
                    </div>
                  ) : (
                    <p>There is no trip scheduled</p>
                  )}
                </InfoProfileBox>
              </div>
            </div>
            <div className="bg-white w-full shadow-lg rounded-lg p-4 flex gap-4 h-[31.5vh]">
              <UserBlocks header='Your level'>
                <div className="flex flex-col justify-between items-center">
                  <p className='text-center'>{level ? level.level : "No level"}</p>
                  <img
                    src={getImageFromLevel(level ? level.level : "Rookie")}
                    alt={level ? level.level : "Rookie"}
                    className="w-1/2 h-3/4 rounded-full"
                  />
                </div>
              </UserBlocks>
              <UserBlocks header='Your opinions'>
                {opinions && opinions.numberOfRatings !== 0 ? (
                  <div className="flex flex-col gap-4 p-4 overflow-auto">
                    <p className='text-center'>You have placed {opinions.numberOfRatings} opinion{opinions.numberOfRatings > 1 && "s"}: </p>
                    {opinions.ratings.map((opinion, index) => (
                      <div key={index}>
                        <p>-You rated {opinion.accomodation.name} at {opinion.rate} star{opinion.rate > 1 && "s"} and left message "{opinion.message}"</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className='text-center'>You have not yet placed any opinions</p>
                )}
              </UserBlocks>
              <UserBlocks header='Your favorites'>
                <p className='text-center'>0</p>
              </UserBlocks>
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <UserProfileForm user={user} userProfile={userProfile} setUserProfile={setUserProfile} isChecked={isChecked} setIsChecked={setIsChecked} switchBtn={switchBtn}/>
            <div className='flex flex-col'>
              <button
                onClick={executeLogout}
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline h-16'
              >
                Logout
              </button>
              <button
                onClick={executeLogout}
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline h-16'
              >
                Remove your profile
              </button>
            </div>
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </main>
  )
}

export default Dashboard
