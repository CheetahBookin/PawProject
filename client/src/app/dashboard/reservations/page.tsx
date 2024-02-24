"use client"

import { getUser } from '@/services/userService'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useUserContext } from '@/context/userContext'
import ReservationCard from '@/components/common/reservation'
import { Reservation } from '@/types/paymentTypes'
import { getSocket } from '@/services/getSocket'

function Reservations() {
  const [reservation, setReservation] = useState<number | null>(null)
  const [paidReservations, setPaidReservations] = useState<Reservation[]>([])
  const [unpaidReservations, setUnpaidReservations] = useState<Reservation[]>([])
  const [showPaidReservations, setShowPaidReservations] = useState<boolean>(false)
  const { setIsLogged } = useUserContext()
  const router = useRouter()
  const socket = getSocket()

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser()
      if(user.status === 200) {
        const allReservations = user.data.orders || [];
        const paid = allReservations.filter((reservation: Reservation) => reservation.paid);
        setPaidReservations(paid);
        socket.on("reservations", (reservations: Reservation[]) => {
          setUnpaidReservations(reservations);
        })
        socket.emit("get-reservations")
        setIsLogged(true)
      } else {
        setIsLogged(false)
        router.push('/login')
      }
    }
    fetchUser()
  }, [socket])

  return (
    <main className="bg-brand-secondary text-gray-700 flex flex-col gap-12 h-auto pb-[14.5vh]">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-semibold text-center">Unpaid reservations</h1>
        {unpaidReservations.length > 0 ? unpaidReservations.map((reservation, index) => {
          return (
            <ReservationCard key={index} reservation={reservation} />
          )
        }) : (
          <div className="flex justify-center items-center h-20">
            <p className="text-gray-500">No unpaid reservations</p>
          </div>
        )
        }
      </div>
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
