'use client'
import { axiosMain } from '@/shared/axios/axiosMain'
import { toast } from 'react-toastify'
import { IUpdateUser, IUser } from '@/shared/api/user/user.interface'

export const getProfile = async () => {
	try {
		const request = await axiosMain().get<IUser>('/user/profile')

		return request.data
	} catch (e: any) {
		toast.error(e.response.data.message)
	}
}

export const updateUser = async (id: string, body: IUpdateUser) => {
	try {
		const request = await axiosMain().patch<IUser>(`/user/${id}`, body)

		return request.data
	} catch (e: any) {
		toast.error(e.response.data.message)
	}
}
