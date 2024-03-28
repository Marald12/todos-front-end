'use server'

import { hasCookie } from 'cookies-next'
import { cookies } from 'next/headers'

export const useIsAuth = async (): Promise<boolean> =>
	hasCookie('token', { cookies })
