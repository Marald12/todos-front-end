'use client'
import { FC, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { hasCookie } from 'cookies-next'

const HomePage: FC = () => {
	const isAuth = hasCookie('token')
	const router = useRouter()

	useEffect(() => {
		if (isAuth) router.push('/todos')
		else router.push('/auth')
	}, [isAuth])

	return <></>
}

export default HomePage
