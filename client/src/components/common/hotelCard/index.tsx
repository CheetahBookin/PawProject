import React, { useEffect, useLayoutEffect, useState } from 'react'
import { RoomImages } from '@/types/hotelTypes'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { getFavorites, postFavorite, removeFavorite } from '@/services/favoritesService'
import { useToast } from '@/components/ui/use-toast'
import { User } from '@/types/userTypes'
import { useUserContext } from '@/context/userContext'
import { getUser } from '@/services/userService'
import Loading from '../loading'

type HotelCardProps = {
  id: number,
  index: number,
  image: RoomImages[],
  name: string,
  city: string,
  flag_url?: string
}

function HotelCard({id, index, image, name, city, flag_url}: HotelCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [addFavorite, setAddFavorite] = useState<boolean>(false);
  const { isLogged, setIsLogged } = useUserContext();

  useLayoutEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await getUser();
        if (userData.status === 200) {
          setUser(userData.data);
          setIsLogged(true);
        } else {
          setIsLogged(false);
        }
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [isLogged]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (user) {
          const response = await getFavorites(user.id);
          if (response?.status === 200) {
            const favorites = response.data;
            const favoriteIds = favorites.map((favorite: any) => favorite.accommodationId);
            setFavorites(favoriteIds);
          }else{
            console.log("error1")
          }
        } else {
          console.log("error2")
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchFavorites();
  }, [user, addFavorite]);  

  const createSlug = (name: string, id: number) =>{
    return `${name.toLowerCase().split(' ').join('-')}-${id}`;
  }

  const handleClick = () =>{
    const slug = createSlug(name, id)
    router.push(`/hotel/${slug}`);
  }

  const addToFavorites = async (userId: number, hotelId: number) =>{
    try{
      const response = await postFavorite(userId, hotelId);
      if(response?.status === 201){
        toast({
          title: "Added to favorites",
          description: "Hotel added to favorites",
          variant: "success"
        });
        setAddFavorite(prevVal=>!prevVal);
      }else{
        toast({
          title: "Error",
          description: "An error occurred while adding to favorites",
          variant: "destructive"
        });
      }
    }catch(error){
      toast({
        title: "Error",
        description: "An error occurred while adding to favorites",
        variant: "destructive"
      });
      console.log(error);
    }
  }

  const delFavorite = async (userId: number, hotelId: number) =>{
    try{
      const response = await removeFavorite(userId, hotelId);
      if(response?.status === 200){
        toast({
          title: "Removed from favorites",
          description: "Hotel removed from favorites",
          variant: "success"
        });
        setAddFavorite(prevVal=>!prevVal);
      }else{
        toast({
          title: "Error",
          description: "An error occurred while removing from favorites",
          variant: "destructive"
        });
      }
    }catch(error){
      toast({
        title: "Error",
        description: "An error occurred while removing from favorites",
        variant: "destructive"
      });
    }
  }

  return (
    <div key={index} className="w-1/4 px-4">
         <img
            src={image[0].image}
            alt={name}
            className="cursor-pointer opacity-80 hover:opacity-100 object-cover rounded-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 m-4 w-72 h-72"
            onClick={handleClick}
        />
        <div className='flex justify-center gap-2 items-center'>
          <p>{name}, {city}</p>
          <img src={flag_url} alt={city} className='w-8'/>
          {user && !loading ? (
            favorites.includes(id) ? <FontAwesomeIcon icon={solidHeart} onClick={()=>delFavorite(user.id, id)} className="text-2xl text-red-700 cursor-pointer hover:text-red-500 hover:transition-all"/> : <FontAwesomeIcon icon={regularHeart} className="text-2xl cursor-pointer hover:text-red-700 hover:transition-all" onClick={()=>addToFavorites(user.id, id)}/>) : <Loading />}
        </div>
    </div>
  )
}

export default HotelCard
