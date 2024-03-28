'use client'
import { axiosMain } from '@/shared/axios/axiosMain'
import { toast } from 'react-toastify'
import { IUser } from '@/shared/api/user/user.interface'

export const getProfile = async () => {
	try {
		const request = await axiosMain().get<IUser>('/user/profile')

		return request.data
	} catch (e: any) {
		toast.error(e.response.data.message)
	}
}
