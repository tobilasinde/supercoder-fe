import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { getAuth } from './authHelper'

export function setupAxios(axios: any) {
	axios.defaults.headers.Accept = 'application/json'
	axios.interceptors.request.use(
		(config: { headers: { Authorization: string } }) => {
			const auth = getAuth()
			if (auth && auth.token) {
				config.headers.Authorization = `Bearer ${auth.token}`
			}
			return config
		},
		(err: any) => Promise.reject(err)
	)
	axios.interceptors.response.use(
		(response: AxiosResponse) => {
			response.data?.message && toast.success(response.data.message)
			return response.data.data
		},
		async (error: AxiosError) => {
			const data: any = error?.response?.data
			if (data?.message) toast.error(data.message)
			throw error
		}
	)
}
