import React from 'react'
import { useEffect, useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { createUserProfile, getUserProfile, updateUserProfile } from '@/services/userProfileService'
import { useToast } from '@/components/ui/use-toast'
import { User } from '@/types/userTypes'
import { UserProfileType } from '@/types/userProfileTypes'
import { useDarkMode } from '@/context/DarkModeContext'

type UserProfileFormProps = {
  user: User
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfileType>>
  userProfile: UserProfileType
  isChecked: boolean
  switchBtn: boolean
}

function UserProfileForm({
  user,
  setIsChecked,
  setUserProfile,
  userProfile,
  isChecked,
  switchBtn,
}: UserProfileFormProps) {
  const { toast } = useToast()
  const [darkModeSwitched, setDarkModeSwitched] = useState(false)
  const { setDarkMode } = useDarkMode()
  const handleSwitchChange = () => {
    setIsChecked((prevValue) => !prevValue)
  }
  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  useEffect(() => {
    const setDarkModeRT = async () => {
      if(user){
        const userProfile = await getUserProfile(user.id)
        if(userProfile.status === 200){
          const darkModeState = userProfile.data.darkMode
          setDarkMode(darkModeState)
        }
      }
    }
    setDarkModeRT()
  }, [darkModeSwitched])

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (user) {
        const response = await createUserProfile(
          user.id,
          userProfile.firstName,
          userProfile.lastName,
          userProfile.country,
          userProfile.address,
          userProfile.profileImage,
          isChecked
        )
        if (response.status === 201) {
          toast({
            title: 'Profile Created',
            description: 'Your profile has been created successfully',
            variant: 'success',
          })
          setDarkModeSwitched(prevVal=>!prevVal)
        } else {
          toast({
            title: 'Error',
            description: 'Failed to create user profile.',
            variant: 'destructive',
          })
          console.error(response)
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create user profile.',
        variant: 'destructive',
      })
      console.error(error)
    }
  }

  console.log(isChecked, userProfile.darkMode)

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (user) {
        const response = await updateUserProfile(
            user.id,
            userProfile.firstName,
            userProfile.lastName,
            userProfile.country,
            userProfile.address,
            userProfile.profileImage,
            isChecked
        )
        if (response.status === 200) {
          toast({
            title: 'Profile Updated',
            description: 'Your profile has been updated successfully',
            variant: 'success',
          })
          setDarkModeSwitched(prevVal=>!prevVal)
        } else {
          toast({
            title: 'Error',
            description: 'Failed to update user profile.',
            variant: 'destructive',
          })
          console.error(response)
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update user profile.',
        variant: 'destructive',
      })
      console.error(error)
    }
  }
  return (
    <form className='max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
      <div className='mb-4'>
        <label htmlFor='firstName' className='block text-gray-700 text-sm font-bold mb-2'>
          First Name:
        </label>
        <input
          type='text'
          id='firstName'
          name='firstName'
          value={userProfile.firstName}
          onChange={handleProfileInputChange}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          placeholder='Enter your first name'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='lastName' className='block text-gray-700 text-sm font-bold mb-2'>
          Last Name:
        </label>
        <input
          type='text'
          id='lastName'
          name='lastName'
          value={userProfile.lastName}
          onChange={handleProfileInputChange}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          placeholder='Enter your last name'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='country' className='block text-gray-700 text-sm font-bold mb-2'>
          Country:
        </label>
        <input
          type='text'
          id='country'
          name='country'
          value={userProfile.country}
          onChange={handleProfileInputChange}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          placeholder='Enter your country'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='address' className='block text-gray-700 text-sm font-bold mb-2'>
          Address:
        </label>
        <input
          type='text'
          id='address'
          name='address'
          value={userProfile.address}
          onChange={handleProfileInputChange}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          placeholder='Enter your address'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='profileImage' className='block text-gray-700 text-sm font-bold mb-2'>
          Profile Image URL:
        </label>
        <input
          type='text'
          id='profileImage'
          name='profileImage'
          value={userProfile.profileImage}
          onChange={handleProfileInputChange}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          placeholder='Enter URL of your profile image'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2'>Switch to dark mode</label>
        <Switch defaultChecked={isChecked} onCheckedChange={handleSwitchChange} />
      </div>
      {switchBtn ? (
        <button
          type='button'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          onClick={handleProfileSubmit}
        >
          Save Profile
        </button>
      ) : (
        <button
          type='button'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          onClick={handleProfileUpdate}
        >
          Update Profile
        </button>
      )}
    </form>
  )
}

export default UserProfileForm
