'use client'
import { axiosMain } from '@/shared/axios/axiosMain'
import {
	IAuth,
	ILoginDto,
	IRegisterDto
} from '@/shared/api/auth/auth.interface'
import { toast } from 'react-toastify'
import { setCookie } from 'cookies-next'

export const login = async (body: ILoginDto) => {
	try {
		const request = await axiosMain().post<IAuth>('/auth/login', body)

		setCookie('token', request.data.token)

		toast.success('Авторизация прошла успешно')

		return request.data
	} catch (e: any) {
		toast.error(e.response.data.message)
	}
}

export const register = async (body: IRegisterDto) => {
	try {
		const request = await axiosMain().post<IAuth>('/auth/register', body)

		setCookie('token', request.data.token)

		toast.success('Регистрация прошла успешно')

		return request.data
	} catch (e: any) {
		toast.error(e.response.data.message)
	}
}
