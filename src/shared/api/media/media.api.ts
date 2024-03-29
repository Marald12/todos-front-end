import { axiosMain } from '@/shared/axios/axiosMain'
import { IMedia } from '@/shared/api/media/media.interface'

export const uploadMedia = async (media: FormData, folder?: string) => {
	try {
		const request = await axiosMain().post<IMedia>('/media', media, {
			params: { folder },
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})

		return request.data
	} catch (e: any) {
		console.log(e.response.data.message)
	}
}
