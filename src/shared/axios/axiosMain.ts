import axios from 'axios'

export const axiosMain = axios.create({
	baseURL: 'http://localhost:3001/api'
})
