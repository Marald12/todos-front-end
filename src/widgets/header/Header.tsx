'use client'
import { ChangeEvent, FC } from 'react'
import Link from 'next/link'
import { deleteCookie, hasCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getProfile, updateUser } from '@/shared/api/user/user.api'
import { uploadMedia } from '@/shared/api/media/media.api'

const Header: FC = () => {
	const router = useRouter()
	const queryClient = useQueryClient()
	const auth = hasCookie('token')

	const { data, isLoading } = useQuery({
		queryKey: ['user'],
		queryFn: () => getProfile()
	})

	const { mutateAsync } = useMutation({
		mutationFn: (url: string) => updateUser(data!._id, { avatarPath: url })
	})

	if (!data && isLoading) return <div>Loading...</div>

	const exitHandler = () => {
		deleteCookie('token')
		toast.success('Вы успешно вышли из аккаунта')
		router.push('/')
		router.refresh()
	}

	const fileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0]

		const formData = new FormData()
		formData.append('media', file)

		const media = await uploadMedia(formData, 'avatar')
		await mutateAsync(media!.url)
		await queryClient.invalidateQueries({
			queryKey: ['user']
		})
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
					{data && (
						<div className='flex items-center mr-5'>
							<div className='relative'>
								<Image
									src={data?.avatarPath}
									alt={data?.avatarPath}
									width={35}
									height={35}
									className='rounded-[50%] bg-cover'
								/>
								<input
									type='file'
									className='hidden'
									id='file'
									onChange={e => fileHandler(e)}
								/>
								<label
									htmlFor='file'
									className='absolute -top-[2px] cursor-pointer opacity-0'
								>
									123
								</label>
							</div>
							<span className='ml-[15px]'>{data?.name}</span>
						</div>
					)}
					<span className='text-lg cursor-pointer' onClick={exitHandler}>
						Выйти
					</span>
				</div>
			)}
		</header>
	)
}

export default Header
