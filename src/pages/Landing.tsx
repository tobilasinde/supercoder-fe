import React from 'react'
import { useAuth } from '../core/Auth'
import { Link } from 'react-router-dom'

function Landing() {
	const { currentUser, logout } = useAuth()
	// const { status: galleryStatus, data: gallery } = useQuery({
	// 	queryKey: [QUERIES.IMAGES],
	// 	queryFn: () => {
	// 		return getGalleries(
	// 			`page_number=1&page_size=25&sort_field=id&sort_order=desc&filter={"status":true}`
	// 		)
	// 	},
	// })
	return (
		<>
			Landing Page
			{currentUser ? (
				<div>
					<div>{currentUser.lastname + ' ' + currentUser.firstname}</div>
					<div>
						<Link to='/cars'>Cars</Link>
						<br />
						<button onClick={logout}>Logout</button>
					</div>
				</div>
			) : (
				<div>
					<Link to='/auth/login'>Login</Link>
					<br />
					<Link to='/auth/signup'>Sign Up</Link>
				</div>
			)}
		</>
	)
}

export default Landing
