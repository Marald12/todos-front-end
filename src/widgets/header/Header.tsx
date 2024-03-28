'use client'
import { FC } from 'react'
import Link from 'next/link'
import { deleteCookie, hasCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const Header: FC = () => {
	const isAuth = hasCookie('token')
	const router = useRouter()

	const exitHandler = () => {
		deleteCookie('token')
		toast.success('Вы успешно вышли из аккаунта')
		router.refresh()
	}

	return (
		<header className='flex justify-between border-b-2 py-2 px-14'>
			<Link
				href='/'
				className='text-2xl hover:text-gray-400 transition-colors ease-in-out items-center'
			>
				Todos
			</Link>
			{isAuth && (
				<p className='text-lg cursor-pointer' onClick={exitHandler}>
					Выйти
				</p>
			)}
		</header>
	)
}

export default Header
