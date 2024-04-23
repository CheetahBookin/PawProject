import Modal from '@/components/common/modal'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import { logout, updateEmail, updateNickname, updatePassword, updatePhone } from '@/services/userService'
import { User } from '@/types/userTypes'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

type ExecuteButtonsProps = {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  setIsLogged: (value: boolean) => void
  setUpdateData: React.Dispatch<React.SetStateAction<{
    nickname: string
    email: string
    newPassword: string
    currPassword: string
    phoneNumber: string
  }>>
  updateData: {
    nickname: string
    email: string
    newPassword: string
    currPassword: string
    phoneNumber: string
  }
}

function ExecuteButtons({ user, setUser, setIsLogged, setUpdateData, updateData }: ExecuteButtonsProps) {
  const [showLModal, setShowLModal] = useState<boolean>(false)
  const [showSModal, setShowSModal] = useState<boolean>(false)
  const router = useRouter()
  const { toast } = useToast()
  const executeLogout = async () => {
    const response = await logout()
    if (response.status === 200) {
      setUser(null)
      setIsLogged(false)
      router.push(response.data.redirectTo)
    }
  }

  const openSettings = () => {
    setShowSModal(true)
  }

  const openLogout = () => {
    setShowLModal(true)
  }

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    })
  }

  const updateNick = async () => {
    if(user){
      const response = await updateNickname(user.id, updateData.nickname)
      if (response.status === 200) {
        setUser({ ...user, username: updateData.nickname })
        toast({
          title: 'Success',
          description: response.data.message,
          variant: 'success'
        })
      }else{
        toast({
          title: 'Error',
          description: response.data.error,
          variant: 'destructive'
        })
      }
    }
  }

  const updateMail = async () => {
    if(user){
      const response = await updateEmail(user.id, updateData.email)
      if (response.status === 200) {
        setUser({ ...user, email: updateData.email })
        toast({
          title: 'Success',
          description: response.data.message,
          variant: 'success'
        })
      }else{
        toast({
          title: 'Error',
          description: response.data.error,
          variant: 'destructive'
        })
      }
    }
  }

  const updatePass = async () => {
    if(user){
      const response = await updatePassword(user.id, updateData.newPassword, updateData.currPassword)
      if (response.status === 200) {
        toast({
          title: 'Success',
          description: response.data.message,
          variant: 'success'
        })
      }else{
        toast({
          title: 'Error',
          description: response.data.error,
          variant: 'destructive'
        })
      }
    }
  }

  const updatePhoneNum = async () => {
    if(user){
      const response = await updatePhone(user.id, updateData.phoneNumber)
      if (response.status === 200) {
        setUser({ ...user, phoneNumber: updateData.phoneNumber })
        toast({
          title: 'Success',
          description: response.data.message,
          variant: 'success'
        })
      }else{
        toast({
          title: 'Error',
          description: response.data.error,
          variant: 'destructive'
        })
      }
    }
  }

  return (
    <div className='flex flex-col'>
      <button
        onClick={openSettings}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline h-16'
      >
        Settings
      </button>
      {showSModal && (
        <Modal
          setShowModal={setShowSModal}
          children={
            <div className='flex flex-col gap-4'>
              <Tabs defaultValue='change_nick'>
                <TabsList>
                  <TabsTrigger value='change_nick'>Update nickname</TabsTrigger>
                  <TabsTrigger value='change_email'>Update email</TabsTrigger>
                  <TabsTrigger value='change_password'>Update password</TabsTrigger>
                  <TabsTrigger value='change_phone_number'>Update phone number</TabsTrigger>
                </TabsList>
                <TabsContent value='change_nick'>
                  <form className='flex flex-col gap-4'>
                    <input
                      type='text'
                      placeholder='Nickname'
                      className='border border-gray-400 p-2 rounded'
                      defaultValue={user?.username}
                      name='nickname'
                      onChange={(e) => handleUpdate(e)}
                    />
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='button' onClick={updateNick}>
                      Update
                    </button>
                  </form>
                </TabsContent>
                <TabsContent value='change_email'>
                  <form className='flex flex-col gap-4'>
                    <input
                      type='email'
                      placeholder='Email'
                      className='border border-gray-400 p-2 rounded'
                      defaultValue={user?.email}
                      name='email'
                      onChange={(e) => handleUpdate(e)}
                    />
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={updateMail} type='button'>
                      Update
                    </button>
                  </form>
                </TabsContent>
                <TabsContent value='change_password'>
                  <form className='flex flex-col gap-4'>
                    <input
                      type='password'
                      placeholder='Old password'
                      className='border border-gray-400 p-2 rounded'
                      name='currPassword'
                      onChange={(e) => handleUpdate(e)}
                    />
                    <input
                      type='password'
                      placeholder='New password'
                      className='border border-gray-400 p-2 rounded'
                      name='newPassword'
                      onChange={(e) => handleUpdate(e)}
                    />
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={updatePass} type='button'>
                      Update
                    </button>
                  </form>
                </TabsContent>
                <TabsContent value='change_phone_number'>
                  <form className='flex flex-col gap-4'>
                    <input
                      type='text'
                      placeholder='Phone number'
                      className='border border-gray-400 p-2 rounded'
                      defaultValue={user?.phoneNumber ? user.phoneNumber : ''}
                      name='phoneNumber'
                      onChange={(e) => handleUpdate(e)}
                    />
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='button' onClick={updatePhoneNum}>
                      Update
                    </button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          }
        />
      )}
      <button
        onClick={openLogout}
        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline h-16'
      >
        Logout
      </button>
      {showLModal && (
        <Modal
          setShowModal={setShowLModal}
          children={
            <div className='flex flex-col gap-4'>
              <p className='text-center'>Are you sure you want to logout?</p>
              <div className='flex justify-center gap-4'>
                <button
                  onClick={executeLogout}
                  className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowLModal(false)}
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                >
                  No
                </button>
              </div>
            </div>
          }
        />
      )}
    </div>
  )
}

export default ExecuteButtons
