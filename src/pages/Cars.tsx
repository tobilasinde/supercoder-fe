import React, { useMemo } from 'react'
import { useAuth } from '../core/Auth'
// import { Link } from 'react-router-dom'
import { FormikValues, useFormik } from 'formik'
import * as Yup from 'yup'
import Select from 'react-select'
import { UserModel } from '../core/model'
import { updateUser } from '../core/request'
import { useQuery } from '@tanstack/react-query'
import { QUERIES } from '../helpers/consts'
import { getCars } from '../core/request'
import './table.css'
import { Link } from 'react-router-dom'

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
	const [reload, setReload] = React.useState(0)
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
			'?reload=' +
			reload +
			'&page_size=' +
			page.size +
			'&page_number=' +
			page.number +
			'&'
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
	}, [currentUser, page.size, page.number, reload])
	const { data: cars } = useQuery({
		queryKey: [QUERIES.CARS, [query]],
		queryFn: () => {
			return getCars(query)
		},
	})
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: initialValues,
		validationSchema: registrationSchema,
		onSubmit: async (values: FormikValues, { setStatus }: any) => {
			try {
				setStatus()
				await updateUser(values, currentUser?.id!)
				setReload(reload + 1)
			} catch (error) {
				// setStatus('The signup details is incorrect')
			}
		},
	})
	return (
		<>
			<header className='nav-header bg-body-white'>
				<nav className='navbar navbar-expand-lg bg-body-white border'>
					<div className='container-fluid row justify-content-between justify-content-md-around'>
						<div className='col-5 col-md-2 logo-container '>
							<Link
								className='navbar-brand logo p-0 d-inline-block  m-auto text-center w-100 fw-bolder'
								to='/'
							>
								<img
									src='./assets/images/super.png'
									className='logo logo-img'
									id='logo'
									alt='Super Cars Logo '
									width='100%'
									height='100%'
								/>
							</Link>
						</div>

						<button
							className='navbar-toggler offset-3 col-4'
							type='button'
							data-bs-toggle='collapse'
							data-bs-target='#navbarSupportedContent'
							aria-controls='navbarSupportedContent'
							aria-expanded='false'
							aria-label='Toggle navigation'
						>
							<span className='navbar-toggler-icon'></span>
						</button>
						<div className='collapse navbar-collapse row border offset-md-2 col-6'>
							<div className=' row border p-2' id='navbarSupportedContent'>
								<ul className='navbar-nav  text-center  mb-2 mb-lg-0 nav-ul '>
									<li className='nav-item col mx-2'>
										<a
											className='nav-link active'
											aria-current='page'
											href='index.html'
										>
											Home
										</a>
									</li>
									<li className='nav-item col mx-2'>
										<a
											className='nav-link active'
											aria-current='page'
											href='index.html'
										>
											Hi, {currentUser?.firstname} {currentUser?.lastname}
										</a>
									</li>
									<li className='nav-item col mx-2 Order'>
										<button className='nav-link order-link' onClick={logout}>
											Logout
										</button>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</nav>
			</header>

			<main className='main-container  bg-dark  '>
				{/* <marquee behavior="scroll" className="text-white f-whilder-white fw-bolder " direction="left"  direction="left"> bolder " direction="left"  directimarqueeWELCOME TO SUPERCARS LISTING PAGE</marquee> */}

				<section className='user_preference_form p-2 bg-white border border-3'>
					<div className='row justify-content-md-around align-items-center'>
						<div className='col-md-12 col-xl-5'>
							<h3 className='text '>
								CHOOSE YOUR{' '}
								<span className='text-orange fw-bolder'>
									TOY FROM OUR COLLECTION OF CARS{' '}
								</span>
								SPECIALLY SELECTED FOR YOUR TASTE AND BUDGET
							</h3>

							{/* <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/qLudEE474M8?si=AOh_t6XkB4Y3Xfj7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> --> */}
						</div>

						<div className='col-md-12 col-xl-6'>
							<div className='col'>
								<form
									className='preference_form row py-3 border border-5 rounded-3 justify-content-center m-auto m-md-0 needs-validation'
									noValidate
									onSubmit={formik.handleSubmit}
								>
									<div className='col-6'>
										<label
											htmlFor='validationCustom01'
											className='form-label fw-bolder min_year'
										>
											Annual Income
										</label>
										<input
											type='number'
											className='form-control year'
											id='validationCustom01'
											placeholder='Enter Annual Income'
											{...formik.getFieldProps('annual_income')}
										/>
										<div className='valid-feedback'>Looks good!</div>
									</div>
									<div className='col-6'>
										<label
											htmlFor='validationCustom01'
											className='form-label fw-bolder min_year'
										>
											Favourite Brands
										</label>
										<Select
											defaultValue={
												currentUser?.fav_brands
													? currentUser.fav_brands.map((b) => {
															return { value: b, label: b.toUpperCase() }
													  })
													: []
											}
											isMulti
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
										<div className='valid-feedback'>Looks good!</div>
									</div>
									<div className='col-6'>
										<label
											htmlFor='validationCustom01'
											className='form-label fw-bolder min_year'
										>
											Min Year
										</label>
										<input
											type='number'
											className='form-control year'
											id='validationCustom01'
											placeholder='Enter Car model Year'
											{...formik.getFieldProps('min_year')}
										/>
										<div className='valid-feedback'>Looks good!</div>
									</div>

									<div className='col-6'>
										<label
											htmlFor='validationCustom02'
											className='form-label fw-bolder transmission_label'
										>
											Transmission
										</label>
										<select
											className='form-control transmission'
											id='transmission'
											{...formik.getFieldProps('transmission')}
										>
											<option value=''>All</option>
											<option value='manual'>Manual</option>
											<option value='automatic'>Automatic</option>
											<option value='semi-auto'>Semi-Auto</option>
											<option value='other'>Other</option>
										</select>
										<div className='valid-feedback'>Looks good!</div>
									</div>

									<div className='col-6'>
										<label
											htmlFor='mileage'
											className='form-label fw-bolder mileage_label'
										>
											Max Mileage
										</label>
										<input
											type='number'
											className='form-control mileage'
											id='mileage'
											placeholder='Enter max mileage here'
											{...formik.getFieldProps('max_mileage')}
										/>
										<div className='valid-feedback'>Looks good!</div>
									</div>
									<div className='col-6'>
										<label
											htmlFor='fuelType'
											className='form-label fw-bolder fuelType_label'
										>
											Fuel Type
										</label>
										<select
											className='form-control fuel_type'
											id='fuel_type'
											{...formik.getFieldProps('fuel_type')}
										>
											<option value=''>All</option>
											<option value='petrol'>Petrol</option>
											<option value='diesel'>Diesel</option>
											<option value='electric'>Electric</option>
											<option value='hybrid'>Hybrid</option>
											<option value='other'>Other</option>
										</select>
										<div className='valid-feedback'>Looks good!</div>
									</div>
									<div className='col-6'>
										<label
											htmlFor='minBudget'
											className='form-label fw-bolder budget_label'
										>
											Min Budget
										</label>
										<input
											type='number'
											className='form-control min_budget'
											id='min_budget'
											placeholder='Enter minimum budget here'
											{...formik.getFieldProps('min_budget')}
										/>
										<div className='valid-feedback'>Looks good!</div>
									</div>
									<div className='col-6'>
										<label
											htmlFor='maxBudget'
											className='form-label fw-bolder budget_label'
										>
											Max Budget
										</label>
										<input
											type='number'
											className='form-control max_budget'
											id='max_budget'
											placeholder='Enter your maximum budget here'
											{...formik.getFieldProps('max_budget')}
										/>
										<div className='valid-feedback'>Looks good!</div>
									</div>
									<div className='col-6 m'>
										<label
											htmlFor='purchase'
											className='form-label fw-bolder purchasePlan_label'
										>
											Purchase Preference
										</label>
										<select
											className='form-control purchasePlan'
											id='purchasePlan'
											{...formik.getFieldProps('purchase_preference')}
										>
											<option value='0'>Full One Time Payment</option>
											<option value='1'>1 Year Installment</option>
											<option value='2'>2 Years Installment</option>
											<option value='3'>3 Years Installment</option>
											<option value='4'>4 Years Installment</option>
											<option value='5'>5 Years Installment</option>
										</select>
										<div className='valid-feedback'>Looks good!</div>
									</div>

									<div className='col-6 mt-4 p-2'>
										<button className='btn fw-bolder submit-btn' type='submit'>
											Submit form
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>

				<div className='container-fluid  px-3 car-list-card-wrapper row border g-2 justify-content-between m-auto row w-100'>
					{cars?.rows?.map((car) => (
						<div
							className='card col-6 col-md-8 px-0 my-4'
							style={{ width: '25rem' }}
						>
							<a href='#!' className='d-inline-block'>
								<img
									src='https://images.template.net/wp-content/uploads/2016/04/27093219/Pure-Black-Car-Wallpaper.jpg'
									className='card-img-top'
									alt='...'
									width='100%'
									height='250px'
								/>
							</a>
							<div className='card-body car-list-card rounded px-0 pb-2'>
								<h5 className='model fw-light text-capitalize fw-bold'>
									{car.make + ' ' + car.model + ' ' + car.year}
								</h5>
								<div className='row justify-content-between p-0  w-100'>
									<span className='carPrice col-6 mb-2 m-0 fw-bold '>
										From:{' '}
										{car.price?.toLocaleString('en-GB', {
											style: 'currency',
											currency: 'GBP',
										})}{' '}
										<small className='px-0'>
											Milage:{' '}
											<span
												className='card-subtitle px-0 col-12 mb-2 fw-bold initial-price '
												id='initialPrice'
											>
												{car.mileage}
											</span>
										</small>
									</span>
									<div className='card-subtitle row col-6  px-0 mb-2 text-muted '>
										<small className='px-0'>
											<span
												className='card-subtitle px-0 col-12 mb-2 fw-bold contract-duration'
												id='contractDuration'
											>
												{formik.values.purchase_preference === 0
													? 'Full Payment'
													: formik.values.purchase_preference +
													  'Year(s) Installment'}
											</span>
										</small>

										<small className='px-0'>
											Total/yr:{' '}
											<span
												className='card-subtitle px-0 col-12 mb-2 fw-bold initial-price '
												id='initialPrice'
											>
												{(
													(formik.values.purchase_preference === 5
														? car.total5_years
														: formik.values.purchase_preference === 1
														? car.total1_years
														: formik.values.purchase_preference === 2
														? car.total2_years
														: formik.values.purchase_preference === 3
														? car.total3_years
														: formik.values.purchase_preference === 4
														? car.total4_years
														: car.total0_years) /
													(formik.values.purchase_preference || 1)
												).toLocaleString('en-GB', {
													style: 'currency',
													currency: 'GBP',
												})}
											</span>
										</small>
									</div>
								</div>
								<p className='card-text'> </p>
							</div>
						</div>
					))}
				</div>
				<div className='col row m-auto'>
					{page.number > 1 && (
						<div className='col-4 m-1'>
							<button
								className='text-decoration-none d-inline-block w-100 p-2 text-center rounded login-link'
								onClick={() => {
									setPage({ ...page, number: page.number - 1 })
								}}
							>
								Previous
							</button>{' '}
						</div>
					)}
					{(cars?.count || 0) > page.size * page.number && (
						<div className='col-4 m-1'>
							<button
								className='text-decoration-none d-inline-block w-100 p-2 text-center rounded login-link'
								onClick={() => {
									setPage({ ...page, number: page.number + 1 })
								}}
							>
								Next
							</button>
						</div>
					)}
				</div>
			</main>

			<footer
				className='superCars-footer border border-3 px-0 py-4 bg-dark text-white'
				style={{ minHeight: '100px' }}
			>
				<div className='container-fluid row '>
					<div
						className='nav-logo row justify-content-between align-items-center'
						id='nav-logo'
					>
						<div className='col-5 col-md-2 logo-container '>
							<a
								className='navbar-brand logo p-4 d-inline-block border m-auto text-center w-100 fw-bolder'
								href='index.html'
							>
								SUPERCARS
							</a>
						</div>

						<div className='col-6 row justify-content-evenly align-items-center '>
							<div className='col-12 col-md-5'>
								Contact Us: *****@domain.com
							</div>
							<div className='col-12 col-md-offset-2 col-md-5 fw-bolder'>
								{' '}
								&copy; Copyright {new Date().getFullYear()}
							</div>
							.
						</div>
						{/* <div className='col row'>
							<div className='col-7 m-1'>
								<a
									className='text-decoration-none d-inline-block w-100 p-2 text-center rounded login-link'
									href='login.html'
								>
									Sign
								</a>{' '}
							</div>
							<div className='col-7 m-1'>
								<a
									className='text-decoration-none d-inline-block w-100 p-2 text-center rounded login-link'
									href='signup.html'
								>
									SignUp
								</a>
							</div>
						</div> */}
					</div>
				</div>
			</footer>
		</>
	)
}
