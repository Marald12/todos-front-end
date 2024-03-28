'use client'
import { FC, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { hasCookie } from 'cookies-next'

const HomePage: FC = () => {
	const isAuth = hasCookie('token')
	const router = useRouter()

	useEffect(() => {
		if (isAuth) router.push('/token')
		else router.push('/auth')
	}, [])

	return <></>
}

export default HomePage
