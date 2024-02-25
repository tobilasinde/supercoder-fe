import React, {
	FC,
	useState,
	useEffect,
	createContext,
	useContext,
	useRef,
	Dispatch,
	SetStateAction,
} from 'react'
import { AuthModel, UserModel, WithChildren } from './model'
import * as authHelper from './authHelper'
import { getUserByToken } from './request'

const LayoutSplashScreen: FC = () => {
	return (
		<div className='splash-screen'>
			<div className='splash-icon'></div>
		</div>
	)
}
type AuthContextProps = {
	auth: AuthModel | undefined
	saveAuth: (auth: AuthModel | undefined) => void
	currentUser: UserModel | undefined
	setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
	logout: () => void
}

const initAuthContextPropsState = {
	auth: authHelper.getAuth(),
	saveAuth: () => {},
	currentUser: undefined,
	setCurrentUser: () => {},
	logout: () => {},
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
	return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({ children }) => {
	const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
	const [currentUser, setCurrentUser] = useState<UserModel | undefined>()

	const saveAuth = (auth: AuthModel | undefined) => {
		if (auth) {
			setAuth(auth)
			authHelper.setAuth(auth)
		} else {
			authHelper.removeAuth()
		}
	}

	const logout = () => {
		saveAuth(undefined)
		setCurrentUser(undefined)
	}

	return (
		<AuthContext.Provider
			value={{ auth, saveAuth, currentUser, setCurrentUser, logout }}
		>
			{children}
		</AuthContext.Provider>
	)
}

const AuthInit: FC<WithChildren> = ({ children }) => {
	const { auth, logout, setCurrentUser } = useAuth()
	const didRequest = useRef(false)
	const [showSplashScreen, setShowSplashScreen] = useState(true)
	// We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
	useEffect(() => {
		const requestUser = async () => {
			try {
				if (!didRequest.current) {
					const data = await getUserByToken()
					if (data) {
						setCurrentUser(data)
					}
				}
			} catch (error) {
				if (!didRequest.current) {
					logout()
				}
			} finally {
				setShowSplashScreen(false)
			}

			return () => (didRequest.current = true)
		}

		if (auth && auth.token) {
			requestUser()
		} else {
			logout()
			setShowSplashScreen(false)
		}
		// eslint-disable-next-line
	}, [])

	return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export { AuthProvider, AuthInit, useAuth }
