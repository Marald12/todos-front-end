import { axiosMain } from '@/shared/axios/axiosMain'
import { toast } from 'react-toastify'
import {
	ICreateTodo,
	ITodo,
	IUpdateTodo
} from '@/shared/api/todo/todo.interface'

export const deleteTodo = async (id: string) => {
	try {
		const request = await axiosMain().delete<string>(`/todo/${id}`)

		return request.data
	} catch (e: any) {
		toast.error(e.response.data.message)
	}
}

export const updateTodo = async (id: string, body: IUpdateTodo) => {
	try {
		const request = await axiosMain().patch<ITodo>(`/todo/${id}`, body)

		return request.data
	} catch (e: any) {
		toast.error(e.response.data.message)
	}
}

export const createTodo = async (body: ICreateTodo) => {
	try {
		const request = await axiosMain().post<ITodo>(`/todo`, body)

		return request.data
	} catch (e: any) {
		toast.error(e.response.data.message)
	}
}
