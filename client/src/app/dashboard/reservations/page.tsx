"use client"

import { getUser } from '@/services/userService'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useUserContext } from '@/context/userContext'
import ReservationCard from '@/components/common/reservation'
import { Reservation } from '@/types/paymentTypes'

function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [paidReservations, setPaidReservations] = useState<Reservation[]>([])
  const [unpaidReservations, setUnpaidReservations] = useState<Reservation[]>([])
  const [showPaidReservations, setShowPaidReservations] = useState<boolean>(false)
  const { setIsLogged } = useUserContext()
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser()
      if(user.status === 200) {
        const allReservations = user.data.orders || [];
        setReservations(allReservations);
        const unpaid = allReservations.filter((reservation: Reservation) => !reservation.paid);
        setUnpaidReservations(unpaid);
        const paid = allReservations.filter((reservation: Reservation) => reservation.paid);
        setPaidReservations(paid);
        setIsLogged(true)
      } else {
        setIsLogged(false)
        router.push('/login')
      }
    }
    fetchUser()
  }, [])

  return (
    <main className="bg-brand-secondary text-gray-700 flex flex-col gap-12 h-auto pb-[14.5vh]">
      {unpaidReservations.length > 0 &&
        <>
          <h1>Unpaid reservations:</h1>
          <div className="flex flex-col items-center">
            {unpaidReservations.map((reservation, index) => {
              return (
                <ReservationCard key={index} reservation={reservation} />
              )
            })}
          </div>
        </>
      }
      {paidReservations.length > 0 && (
        <div className="flex justify-center flex-col items-center">
          <button className="bg-brand-primary text-white px-4 py-2 rounded-md my-4" onClick={() => setShowPaidReservations(prevState => !prevState)}>
            {showPaidReservations ? "Hide Paid Reservations" : "Show Paid Reservations"}
          </button>
          {showPaidReservations && paidReservations.map((reservation, index) => {
            return (
              <ReservationCard key={index} reservation={reservation} />
            )
          })}
        </div>
      )}
    </main>
  )
}

export default Reservations
