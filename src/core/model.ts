import { ReactNode } from 'react'

type Response<T> = {
	rows?: T
	count?: number
}
export type ID = undefined | null | number | string

export type Car = {
	id?: number
	make?: string
	model?: string
	year?: number
	price?: number
	transmission?: 'manual' | 'automatic' | 'semi-auto' | 'other'
	mileage?: number
	fuel_type?: string
	tax?: number
	mpg?: number
	engineSize?: number
	maintenanceCostYearly?: number
	average_maintenace_cost_yearly?: number
}

export type CarsQueryResponse = Response<Array<Car>>

export interface UserModel {
	id?: number
	firstname?: string
	lastname?: string
	email?: string
	password?: string
	phone?: string
	annual_income?: number
	fav_brands?: string[]
	min_year?: number
	transmission?: 'manual' | 'automatic' | 'semi-auto' | 'other'
	max_mileage?: number
	fuel_type?: 'petrol' | 'diesel' | 'electric' | 'hybrid' | 'other'
	min_budget?: number
	max_budget?: number
	purchase_preference?: number
}

export interface AuthModel {
	token: string
	refresh_token?: string
}

export type WithChildren = {
	children?: ReactNode
}
