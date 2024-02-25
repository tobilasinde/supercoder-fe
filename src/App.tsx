import React from 'react'
import {
	BrowserRouter,
	Navigate,
	Outlet,
	Route,
	Routes,
} from 'react-router-dom'
import Landing from './pages/Landing'
import { AuthInit, useAuth } from './core/Auth'
import { Signup } from './pages/auth/Signup'
import { Login } from './pages/auth/Login'
import { Cars } from './pages/Cars'
const { PUBLIC_URL } = process.env

const App = () => {
	const { currentUser } = useAuth()
	return (
		<BrowserRouter basename={PUBLIC_URL}>
			{/* <Header /> */}
			<Routes>
				<Route element={<Init />}>
					{currentUser ? (
						<>
							<Route path='/cars' element={<Cars />} />
							<Route path='*' element={<Navigate to='/' />} />
						</>
					) : (
						<>
							<Route path='auth/signup' element={<Signup />} />
							<Route path='auth/login' element={<Login />} />
							<Route path='*' element={<Navigate to='/auth/login' />} />
						</>
					)}
					<Route path='/' element={<Landing />} />
				</Route>
			</Routes>
			{/* <Footer /> */}
		</BrowserRouter>
	)
}

export default App

const Init = () => {
	return (
		<AuthInit>
			<Outlet />
		</AuthInit>
	)
}
