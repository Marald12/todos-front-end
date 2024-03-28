import { IUser } from '@/shared/api/user/user.interface'

export interface ITodo {
	_id: string
	title: string
	todo: string
	isDone: boolean
	user: IUser
	__v: number
}

export interface IUpdateTodo {
	title?: string
	todo?: string
	isDone?: boolean
}

export interface ICreateTodo {
	title: string
	todo: string
	isDone: boolean
}
