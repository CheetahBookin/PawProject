import { RoomImages } from '@/types/hotelTypes';
import { useRouter } from 'next/navigation';


type HotelTypeCardProps = {
    hotelType: string;
    images: RoomImages[];
}

function HotelTypeCard({hotelType, images}: HotelTypeCardProps) {
  const router = useRouter();
  const createSlug = (name: string) =>{
    return name.toLowerCase()
  }

  const handleClick = () =>{
    const slug = createSlug(hotelType)
    router.push(`/hotel/type/${slug}`);
  }
  return (
    <div className="relative w-48 h-48 flex items-center justify-center mx-4 my-4">
        <img src={images[0].image} alt={hotelType} className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-500 cursor-pointer" onClick={handleClick}>
            <p className="text-white text-lg">{hotelType}s</p>
        </div>
    </div>
  )
}

export default HotelTypeCard
