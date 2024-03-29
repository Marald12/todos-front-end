import { ITodo } from '@/shared/api/todo/todo.interface'

export interface IUser {
	_id: string
	email: string
	name: string
	avatarPath: string
	todos: ITodo[]
	__v: number
}

export interface IUpdateUser {
	name?: string
	avatarPath?: string
}
