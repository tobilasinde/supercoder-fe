import React, { useMemo } from 'react'
import { useAuth } from '../core/Auth'
import { Link } from 'react-router-dom'
import { FormikValues, useFormik } from 'formik'
import * as Yup from 'yup'
import Select from 'react-select'
import { UserModel } from '../core/model'
import { updateUser } from '../core/request'
import { useQuery } from '@tanstack/react-query'
import { QUERIES } from '../helpers/consts'
import { getCars } from '../core/request'
import './table.css'

const registrationSchema = Yup.object().shape({
	annual_income: Yup.number().label('Annual Income'),
	fav_brands: Yup.array().label('Fav Brands'),
	min_year: Yup.number().label('Min Year'),
	transmission: Yup.string().label('Transmission'),
	max_mileage: Yup.number().label('Max Mileage'),
	fuel_type: Yup.string().label('Fuel Type'),
	min_budget: Yup.number().label('Min Budget'),
	max_budget: Yup.number().label('Max Budget'),
	purchase_preference: Yup.number().label('Purchase Preference'),
})
export function Cars() {
	const { currentUser, logout } = useAuth()
	const initialValues: UserModel = {
		annual_income: currentUser?.annual_income,
		fav_brands: currentUser?.fav_brands,
		min_year: currentUser?.min_year,
		transmission: currentUser?.transmission,
		max_mileage: currentUser?.max_mileage,
		fuel_type: currentUser?.fuel_type,
		min_budget: currentUser?.min_budget,
		max_budget: currentUser?.max_budget,
		purchase_preference: currentUser?.purchase_preference || 0,
	}
	const [page, setPage] = React.useState({ size: 20, number: 1 })
	const query = useMemo(() => {
		let result: string =
			'?page_size=' + page.size + '&page_number=' + page.number + '&'
		if (currentUser?.annual_income)
			result += `annual_income=${currentUser.annual_income}&`
		if (currentUser?.fav_brands)
			result += `fav_brands=${currentUser.fav_brands}&`
		if (currentUser?.min_year) result += `min_year=${currentUser.min_year}&`
		if (currentUser?.transmission)
			result += `transmission=${currentUser.transmission}&`
		if (currentUser?.max_mileage)
			result += `max_mileage=${currentUser.max_mileage}&`
		if (currentUser?.fuel_type) result += `fuel_type=${currentUser.fuel_type}&`
		if (currentUser?.min_budget)
			result += `min_budget=${currentUser.min_budget}&`
		if (currentUser?.max_budget)
			result += `max_budget=${currentUser.max_budget}&`
		if (currentUser?.purchase_preference)
			result += `purchase_preference=${currentUser.purchase_preference}&`
		return result
	}, [currentUser, page.size, page.number])
	const { status: carStatus, data: cars } = useQuery({
		queryKey: [QUERIES.CARS, [query]],
		queryFn: () => {
			return getCars(query)
		},
	})
	console.log(cars)
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: initialValues,
		validationSchema: registrationSchema,
		onSubmit: async (values: FormikValues, { setStatus }: any) => {
			try {
				setStatus()
				await updateUser(values, currentUser?.id!)
			} catch (error) {
				// setStatus('The signup details is incorrect')
			}
		},
	})
	return (
		<>
			Car Listing Page
			{currentUser && (
				<div>
					<div>{currentUser.lastname + ' ' + currentUser.firstname}</div>
					<div>
						<Link to='/'>Home</Link>
						<br />
						<button onClick={logout}>Logout</button>
					</div>
					<form
						noValidate
						onSubmit={formik.handleSubmit}
						style={{ marginLeft: '15px', marginRight: '15px' }}
					>
						{formik.status && <div>{formik.status}</div>}
						<div>
							<label>Annual Income</label>
							<input
								placeholder='Annual Income'
								type='text'
								{...formik.getFieldProps('annual_income')}
							/>
						</div>
						<div>
							<label>Fav Brands</label>

							<Select
								defaultValue={
									currentUser.fav_brands
										? currentUser.fav_brands.map((b) => {
												return { value: b, label: b.toUpperCase() }
										  })
										: []
								}
								isMulti
								name='colors'
								options={[
									{ value: 'audi', label: 'Audi' },
									{ value: 'bmw', label: 'BMW' },
									{ value: 'ford', label: 'Ford' },
									{ value: 'hyundai', label: 'Hyundai' },
									{ value: 'mercedes', label: 'Mercedes' },
									{ value: 'skoda', label: 'Skoda' },
									{ value: 'toyota', label: 'Toyota' },
									{ value: 'vauxhall', label: 'Vauxhall' },
									{ value: 'volkswagen', label: 'Volkswagen' },
								]}
								className='basic-multi-select'
								classNamePrefix='select'
								onChange={(value: any) => {
									formik.setFieldValue(
										'fav_brands',
										value.map((v: any) => v.value)
									)
								}}
							/>
						</div>
						<div>
							<label>Min Year</label>
							<input
								placeholder='Min Year'
								type='number'
								{...formik.getFieldProps('min_year')}
							/>
						</div>
						<div>
							<label>Transmission</label>
							<select {...formik.getFieldProps('transmission')}>
								<option value=''>All</option>
								<option value='manual'>Manual</option>
								<option value='automatic'>Automatic</option>
								<option value='semi-auto'>Semi-Auto</option>
								<option value='other'>Other</option>
							</select>
						</div>
						<div>
							<label>Max Mileage</label>
							<input
								placeholder='Max Mileage'
								type='number'
								{...formik.getFieldProps('max_mileage')}
							/>
						</div>
						<div>
							<label>Fuel Type</label>
							<select {...formik.getFieldProps('fuel_type')}>
								<option value=''>All</option>
								<option value='petrol'>Petrol</option>
								<option value='diesel'>Diesel</option>
								<option value='electric'>Electric</option>
								<option value='hybrid'>Hybrid</option>
								<option value='other'>Other</option>
							</select>
						</div>
						<div>
							<label>Min Budget</label>
							<input
								placeholder='Min Budget'
								type='number'
								{...formik.getFieldProps('min_budget')}
							/>
						</div>
						<div>
							<label>Max Budget</label>
							<input
								placeholder='Max Budget'
								type='number'
								{...formik.getFieldProps('max_budget')}
							/>
						</div>
						<div>
							<label>Purchase Preference</label>
							<select {...formik.getFieldProps('purchase_preference')}>
								<option value='0'>Full One Time Payment</option>
								<option value='1'>1 Year Installment</option>
								<option value='2'>2 Years Installment</option>
								<option value='3'>3 Years Installment</option>
								<option value='4'>4 Years Installment</option>
								<option value='5'>5 Years Installment</option>
							</select>
						</div>
						<div>
							<button type='submit'>
								{!formik.isSubmitting ? (
									<span>Submit</span>
								) : (
									<span>Loading</span>
								)}
							</button>
						</div>
						{/* end::Form group */}
					</form>
					<table>
						<thead>
							<tr>
								<th>Make</th>
								<th>Model</th>
								<th>Year</th>
								<th>Transmission</th>
								<th>Mileage</th>
								<th>Fuel Type</th>
								<th>Price</th>
							</tr>
						</thead>
						<tbody>
							{cars?.rows?.map((car: any) => (
								<tr>
									<td>{car.make}</td>
									<td>{car.model}</td>
									<td>{car.year}</td>
									<td>{car.transmission}</td>
									<td>{car.mileage}</td>
									<td>{car.fuelType}</td>
									<td>{car.price}</td>
								</tr>
							))}
						</tbody>
					</table>
					{page.number > 1 && (
						<button
							onClick={() => {
								setPage({ ...page, number: page.number - 1 })
							}}
						>
							Previous{' '}
						</button>
					)}
					<button
						onClick={() => {
							setPage({ ...page, number: page.number + 1 })
						}}
					>
						Next
					</button>
				</div>
			)}
		</>
	)
}
