import { IUser } from '@/shared/api/user/user.interface'

export interface ILoginDto {
	email: string
	password: string
}

export interface IAuth {
	user: IUser
	token: string
}

export interface IRegisterDto extends ILoginDto {
	name: string
}
