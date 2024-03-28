'use client'
import { FC, useState } from 'react'
import { LoginForm } from '@/pages/auth/ui/form/LoginForm'
import classNames from 'classnames'
import { RegisterForm } from '@/pages/auth/ui/form/RegisterForm'

const AuthPage: FC = () => {
	const [typeAuth, setTypeAuth] = useState<'login' | 'register'>('login')

	return (
		<div className='flex items-center flex-col'>
			<div className='flex items-center mb-10'>
				<h1
					className={classNames(
						'text-2xl cursor-pointer',
						typeAuth !== 'login' && 'text-gray-500'
					)}
					onClick={() => setTypeAuth('login')}
				>
					Авторизация
				</h1>
				<span className='mx-4'>|</span>
				<h1
					className={classNames(
						'text-2xl cursor-pointer',
						typeAuth !== 'register' && 'text-gray-500'
					)}
					onClick={() => setTypeAuth('register')}
				>
					Регистрация
				</h1>
			</div>
			{typeAuth === 'login' ? <LoginForm /> : <RegisterForm />}
		</div>
	)
}

export default AuthPage
