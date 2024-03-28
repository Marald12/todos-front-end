'use client'
import { FC, useState } from 'react'
import Link from 'next/link'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { useIsAuth } from '@/shared/hooks/isAuth'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { getProfile } from '@/shared/api/user/user.api'

const Header: FC = () => {
	const [auth, setAuth] = useState<boolean>()
	const router = useRouter()
	useIsAuth().then(value => setAuth(value))

	const { data } = useQuery({
		queryKey: ['user'],
		queryFn: () => getProfile()
	})

	const exitHandler = () => {
		deleteCookie('token')
		toast.success('Вы успешно вышли из аккаунта')
		router.push('/')
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
			{auth && (
				<div className='flex items-center'>
					<div className='flex items-center mr-5'>
						<Image
							src={data!.avatarPath}
							alt={data!.avatarPath}
							width={25}
							height={25}
							className='rounded-[50%]'
						/>
						<span className='ml-[15px]'>{data!.name}</span>
					</div>
					<span className='text-lg cursor-pointer' onClick={exitHandler}>
						Выйти
					</span>
				</div>
			)}
		</header>
	)
}

export default Header
