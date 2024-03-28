export interface ILoginDto {
	email: string
	password: string
}

export interface IAuth {
	user: any
	token: string
}

export interface IRegisterDto extends ILoginDto {
	name: string
}
