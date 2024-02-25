import axios from 'axios'
import { CarsQueryResponse, UserModel } from './model'

const API_URL = process.env.REACT_APP_API_URL
const USER_URL = `${API_URL}/profile`

const getCars = (query: string): Promise<CarsQueryResponse> => {
	return axios.get(`${API_URL}/car?${query}`)
}
// const getPost = (id: ID): Promise<Post | undefined> => {
// 	return axios.get(`${POST_URL}/${id}`)
// }
const register = (values: any): Promise<UserModel> => {
	return axios.post(process.env.REACT_APP_API_URL + '/user', values)
}
const updateUser = (values: any, id: number): Promise<UserModel> => {
	return axios.put(process.env.REACT_APP_API_URL + '/user/' + id, values)
}

export async function login(email: string, password: string): Promise<any> {
	return await axios.post(API_URL + '/auth/login', {
		email,
		password,
	})
}
const getUserByToken = (): Promise<UserModel | undefined> => {
	return axios.get(`${USER_URL}`)
}
export { updateUser, getCars, register, getUserByToken }
