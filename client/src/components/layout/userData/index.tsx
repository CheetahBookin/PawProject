import InfoProfileBox from "@/components/common/infoProfileBox";
import Modal from "@/components/common/modal";
import { FinishedUpcomingTrips, MostVisitedDestination, NextTrip } from "@/types/dashboardTypes";
import { User } from "@/types/userTypes";
import React, { useState } from "react"

type UserDataProps = {
    finishedUpcomingTrips: FinishedUpcomingTrips | null;
    mostVisitedDestination: MostVisitedDestination | null;
    nTrip: NextTrip | null;
    user: User;
    userProfile: {
        firstName: string;
        lastName: string;
        country: string;
        address: string;
        profileImage: string;
        darkMode: boolean;
    }
}

function UserData({ finishedUpcomingTrips, mostVisitedDestination, nTrip, user, userProfile }: UserDataProps) {
  const [showModal, setShowModal] = useState(false)
  const showImage = () =>{
    setShowModal(true)
  }
  console.log(mostVisitedDestination)
  return (
    <div className='flex flex-col md:flex-row gap-4'>
      <div className='w-1/3 md:w-30% flex flex-col gap-8 items-center bg-white shadow-lg rounded-lg justify-center'>
        <p>
          Welcome, <span className='font-bold'>{user.username}</span>!
        </p>
        <img
          src={userProfile.profileImage || '/assets/profile.webp'}
          alt='Profile'
          className='w-3/4 h-3/4 rounded-full mb-4 cursor-pointer object-cover'
          onClick={showImage}
        />
        {showModal && <Modal setShowModal={setShowModal} children={<img src={userProfile.profileImage} alt='Profile' />} />}
      </div>
      <div className='w-full md:w-3/4 flex flex-wrap justify-center items-center gap-8 h-[40vh]'>
        <InfoProfileBox text='Finished trips'>
          <p className='text-2xl font-bold'>
            {finishedUpcomingTrips ? finishedUpcomingTrips.finished : '0'}
          </p>
        </InfoProfileBox>
        <InfoProfileBox text='Upcoming trips'>
          <p className='text-2xl font-bold'>
            {finishedUpcomingTrips ? finishedUpcomingTrips.upcoming : '0'}
          </p>
        </InfoProfileBox>
        <InfoProfileBox text='Most visited'>
          {mostVisitedDestination?.mostVisitedCity || mostVisitedDestination?.mostVisitedCountry ? (
            <div>
              <p className='text-lg font-semibold'>
                City: {mostVisitedDestination?.mostVisitedCity.city},{' '}
                {mostVisitedDestination?.mostVisitedCity.count} times
              </p>
              <p className='text-lg font-semibold'>
                Country: {mostVisitedDestination?.mostVisitedCountry.country},{' '}
                {mostVisitedDestination?.mostVisitedCountry.count} times
              </p>
            </div>
          ) : (
            <p className='text-lg font-semibold'>No data</p>
          )}
        </InfoProfileBox>
        <InfoProfileBox text='Next trip'>
          {nTrip?.response ? (
            <div>
              <p className='text-lg font-semibold'>
                {nTrip.response.tripDate.toString().split('T')[0]} you are about to visit{' '}
                {nTrip.response.hotel[0].name} located in {nTrip.response.hotel[0].city},{' '}
                {nTrip.response.hotel[0].country}
              </p>
            </div>
          ) : (
            <p className='text-lg font-semibold'>There is no trip scheduled</p>
          )}
        </InfoProfileBox>
      </div>
    </div>
  )
}

export default UserData
