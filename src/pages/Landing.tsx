import React, { useMemo } from 'react'
import { useAuth } from '../core/Auth'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { QUERIES } from '../helpers/consts'
import { getCars } from '../core/request'

function Landing() {
	const { currentUser, logout } = useAuth()
	const query = useMemo(() => {
		let result: string = ''
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
	}, [currentUser])
	const { data: cars } = useQuery({
		queryKey: [QUERIES.CARS, [query]],
		queryFn: () => {
			return getCars(query)
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
										<Link
											className='nav-link active'
											aria-current='page'
											to='/cars'
										>
											Cars
										</Link>
									</li>
									{currentUser ? (
										<>
											<li className='nav-item col mx-2'>
												<span className='nav-link active' aria-current='page'>
													Hi, {currentUser?.firstname} {currentUser?.lastname}
												</span>
											</li>
											<li className='nav-item col mx-2 Order'>
												<button
													className='nav-link order-link'
													onClick={logout}
												>
													Logout
												</button>
											</li>
										</>
									) : (
										<>
											<li className='nav-item col mx-2'>
												<Link
													className='nav-link active'
													aria-current='page'
													to='/auth/signup'
												>
													Sign Up
												</Link>
											</li>
											<li className='nav-item col mx-2'>
												<Link
													className='nav-link active'
													aria-current='page'
													to='/auth/login'
												>
													Login
												</Link>
											</li>
										</>
									)}
								</ul>
							</div>
						</div>
					</div>
				</nav>
			</header>

			<main>
				<div
					className='hero row min-vh-50 w-100 text-white px-md-5 px-4  '
					id='hero'
				>
					<div className='col col-lg-6 container-wrapper p-md-5 p-4  my-md-5 my-4 mx-md-3 m-auto'>
						<h1 className='purchase-paragraph py-md-4 py-1 '>
							PURCHASE YOUR <br />
							<span className='text-orange'>PERFECT </span> CAR
						</h1>

						<div className='row my-5'>
							<h4 className='hero-text col col-md-9'>
								Over 1000+ New Cars Available Here
							</h4>
							{/* <p className="aboutCars col-9">
                        <marquee behavior="" direction="">
                            Drive Your Dream From the Comfort of our Show Rooms

                        </marquee>
                    </p> */}

							<div className='col-md-3 col  mt-5 ms-3 text-center p-0 '>
								<Link
									className='btn explore-btn text-white d-inline-block border w-100 fw-bolder'
									to='/cars'
								>
									Explore More
								</Link>
							</div>
						</div>
					</div>
				</div>

				<div
					className='container-fluid about-us-wrapper row justify-content-between mb-2 py-5 px-0'
					id='about-us-wrapper'
				>
					<hr className='fw-bolder border border-dark' />

					<div className='col-12 px-0 m-auto col-md-6 aboutUs-img-wrapper'>
						<img
							src='./assets/images/about-car-img.jpg'
							alt='Car Image for about Us'
							width='100%'
							height='100%'
						/>
					</div>
					<div className='col-10 mt-5 mt-md-0 px-md-4 px-1 m-auto col-md-6 aboutUs-txt-wrapper'>
						<h1 className='about-us-heading fw-bolder'>About Us</h1>
						<br />
						<div className='text-content-wrapper overflow-y-auto '>
							<p className='text-content'>
								Welcome to SuperCars, your premier destination for luxury and
								high-performance vehicles.
							</p>

							<p className='text overflow-y-auto'>
								At SuperCars, we pride ourselves on delivering unparalleled
								excellence in the automotive industry, offering a curated
								selection of the finest automobiles that redefine driving
								experiences. <br /> <br />
								At SuperCars, we pride ourselves on delivering unparalleled
								excellence in the automotive industry, offering a curated
								selection of the finest automobiles that redefine driving
								experiences.
								<br />
								<br />
								Beyond just buying and selling cars, we foster lasting
								relationships with our clients, guiding them through every step
								of the car-buying journey with personalized attention and expert
								advice. Our knowledgeable team is here to assist you in finding
								the perfect vehicle that aligns with your lifestyle and
								aspirations. Experience the epitome of automotive excellence
								with SuperCars. Visit our showroom today and embark on a journey
								towards automotive luxury and prestige like never before.
							</p>
						</div>

						<div className='col-4 mt-2'>
							<button
								className='btn  w-100 rounded border-light outline-0 p-lg-3 p-2 p-md-2 read-more-btn'
								id='read-more-btn'
							>
								Read More
							</button>
						</div>
					</div>
				</div>

				<section className='car-display px-md-5 px-4 car-display' id='section'>
					<div className='container-fluid row'>
						<h1
							className='latest-car-heading fw-bolder col-8'
							id='latest-car-heading'
						>
							OUR LATEST CARS
						</h1>
						<p className='text col-6 '>
							Explore our latest arrivals for a curated selection of
							cutting-edge vehicles that redefine luxury and performance.
							Discover excellence today!
						</p>
					</div>

					<div className='container-fluid  px-3 car-list-card-wrapper row border g-2 justify-content-between m-auto row w-100'>
						{cars?.rows?.map((car) => (
							<div
								className='card col-6 col-md-8 px-0 my-4'
								style={{ width: '25rem' }}
							>
								<a href='/cars' className='d-inline-block'>
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
													Full Payment
												</span>
											</small>

											<small className='px-0'>
												Total/yr:{' '}
												<span
													className='card-subtitle px-0 col-12 mb-2 fw-bold initial-price '
													id='initialPrice'
												>
													{car.total0_years.toLocaleString('en-GB', {
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
				</section>
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

export default Landing
