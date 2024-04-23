import UserBlocks from '@/components/common/userBlocks'
import { Level, Opinions } from '@/types/dashboardTypes'
import { FavoritesHotels } from '@/types/favoritesTypes'
import { useRouter } from 'next/navigation'
import React from 'react'

type UserAchievementsProps = {
  level: Level | null
  opinions: Opinions | null
  favorites: FavoritesHotels[]
}

function UserAchievements({ level, opinions, favorites }: UserAchievementsProps) {
  const router = useRouter()
  const getImageFromLevel = (level: string) => {
    switch (level) {
      case 'Rookie':
        return '/levels/rookie.png'
      case 'Starter':
        return '/levels/starter.png'
      case 'Captain':
        return '/levels/captain.png'
      case 'Legend':
        return '/levels/legend.png'
      case 'Hall Of Famer':
        return '/levels/hof.png'
    }
  }

  const createSlug = (name: string, id: number) => {
    return `${name.toLowerCase().split(' ').join('-')}-${id}`
  }

  const handleClick = (name: string, id: number) => {
    const slug = createSlug(name, id)
    router.push(`/hotel/${slug}`)
  }
  return (
    <div className='bg-white w-full shadow-lg rounded-lg p-4 flex justify-center gap-4 h-[31.5vh]'>
      <UserBlocks header='Your level'>
        <div className='flex flex-col justify-between items-center'>
          <p className='text-center'>{level ? level.level : 'No level'}</p>
          <img
            src={getImageFromLevel(level ? level.level : 'Rookie')}
            alt={level ? level.level : 'Rookie'}
            className='w-1/2 h-3/4 rounded-full'
          />
        </div>
      </UserBlocks>
      <UserBlocks header='Your opinions'>
        {opinions && opinions.numberOfRatings !== 0 ? (
          <div className='flex flex-col gap-4 p-4 overflow-auto'>
            <p className='text-center'>
              You have placed {opinions.numberOfRatings} opinion
              {opinions.numberOfRatings > 1 && 's'}:{' '}
            </p>
            {opinions.ratings.map((opinion, index) => (
              <div key={index}>
                <p>
                  -You rated {opinion.accomodation.name} at {opinion.rate} star
                  {opinion.rate > 1 && 's'} and left message "{opinion.message}"
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-center'>You have not yet placed any opinions</p>
        )}
      </UserBlocks>
      <UserBlocks header='Your favorites'>
        {favorites.length !== 0 ? (
          <div className='flex flex-col p-4 overflow-auto'>
            <p className='text-center pb-4'>
              You have {favorites.length} favorite{favorites.length > 1 && 's'}:
            </p>
            {favorites &&
              favorites.map((favorite, index) => {
                console.log(favorite)
                return (
                  <div
                    key={index}
                    onClick={() => handleClick(favorite.name, favorite.id)}
                    className='flex flex-col justify-center cursor-pointer hover:bg-gray-200 hover:transition-all'
                  >
                    <hr className='w-full' />
                    <div className='flex items-center gap-4 py-4'>
                      <div className='w-12 h-12'>
                        <img
                          src={favorite.images[0].image}
                          alt={favorite.name}
                          className='w-full h-full rounded-lg'
                        />
                      </div>
                      <p>{favorite.name}</p>
                    </div>
                  </div>
                )
              })}
          </div>
        ) : (
          <p className='text-center'>You have not yet added any favorites</p>
        )}
      </UserBlocks>
    </div>
  )
}

export default UserAchievements
