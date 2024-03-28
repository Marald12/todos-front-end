'use client'
import axios from 'axios'
import { getCookie } from 'cookies-next'

const token = getCookie('token')

export const axiosMain = () =>
	axios.create({
		baseURL: 'http://localhost:3001/api',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
