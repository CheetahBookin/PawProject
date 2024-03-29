import { getExactHotel } from '@/services/hotelsService'
import { HotelTypes, RoomImages, Rooms } from '@/types/hotelTypes'
import { Reservation } from '@/types/paymentTypes'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getSocket } from '@/services/getSocket'
import { useToast } from '@/components/ui/use-toast'

type ReservationProps = {
  reservation: Reservation
}

const ReservationCard = ({ reservation }: ReservationProps) => {
  const [hotel, setHotel] = useState<HotelTypes | null>(null)
  const socket = getSocket()
  const { toast } = useToast()

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await getExactHotel(String(reservation.hotelId))
        if (response?.status !== 200) {
          console.error('No hotel found')
          return
        }
        setHotel(response.data as HotelTypes)
      } catch (error) {
        console.error('Error fetching hotel:', error)
      }
    }
    fetchHotel()
  }, [reservation])

  const handleCancel = async (orderId: number) => {
    try {
      toast({
        title: 'Reservation cancelled',
        description: 'You have successfully cancelled the reservation',
        variant: 'default',
      })
      socket.emit('cancel-reservation', orderId)
    } catch (error) {
      console.error('Error cancelling reservation:', error)
    }
  }

  return (
    <div className='bg-white shadow-md p-6 rounded-lg mb-4 w-[70vw]'>
      {hotel && (
        <>
          <div className='flex items-center justify-between mb-4'>
            <div>
              {!reservation.paid && (
                <button
                  className='bg-red-600 rounded-lg mb-4 p-4 text-white hover:bg-red-800'
                  onClick={() => handleCancel(reservation.id)}
                >
                  Cancel
                </button>
              )}
              {reservation.paid && new Date(reservation.toDate) > new Date() && (
                <p className='text-emerald-600'>Active</p>
              )}
              {new Date(reservation.toDate) < new Date() && <p className='text-red-600'>Expired</p>}
              {hotel.images && hotel.images.length > 0 && (
                <img
                  src={hotel.images[0].image}
                  alt='Hotel'
                  className='w-24 h-24 object-cover rounded-md'
                />
              )}
              <h2 className='text-xl font-semibold'>{hotel.name}</h2>
              <p className='text-gray-600'>
                {hotel.address}, {hotel.city}, {hotel.country}
              </p>
            </div>
            <img src={hotel.flag_url} alt='Flag' className='w-24 object-cover' />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p>
                <span className='font-semibold'>Reservation ID:</span> {reservation.id}
              </p>
              <p>
                <span className='font-semibold'>Booked at:</span>{' '}
                {reservation.createdAt.toString().split('T')[0]}
              </p>
              <p>
                <span className='font-semibold'>Check-in:</span>{' '}
                {reservation.fromDate.toString().split('T')[0]}
              </p>
              <p>
                <span className='font-semibold'>Check-out:</span>{' '}
                {reservation.toDate.toString().split('T')[0]}
              </p>
            </div>
            <div>
              <p>
                <span className='font-semibold'>Adults:</span> {reservation.adults}
              </p>
              <p>
                <span className='font-semibold'>Children:</span> {reservation.children}
              </p>
              <p>
                <span className='font-semibold'>Full price</span> {reservation.fullPrice}zł
              </p>
              <div className='flex gap-8'>
                <div
                  className={`font-semibold p-4 w-[6vw] flex justify-center ${reservation.paid ? `bg-emerald-600` : `bg-red-600`}`}
                >
                  {reservation.paid ? 'Paid' : 'Not Paid'}
                </div>
                {!reservation.paid && (
                  <Link
                    href={`/dashboard/reservations/checkout?order=${reservation.id}`}
                    className='bg-brand-primary text-white px-4 py-2 rounded-md flex items-center'
                  >
                    Pay
                  </Link>
                )}
                <button
                  className='bg-blue-500 text-white px-4 py-2 rounded-md flex items-center'
                >
                  <a href={`/invoice/invoice_${reservation.id}.pdf`}>Download invoice</a>
                </button>
              </div>
            </div>
          </div>
          <p className='mt-4'>
            <span className='font-semibold'>Hotel Type:</span> {hotel.type}
          </p>
  
        </>
      )}
      {!hotel && <p>Loading...</p>}
    </div>
  )
}

export default ReservationCard
