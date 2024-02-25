/* eslint-disable jsx-a11y/anchor-is-valid */
import { FormikValues, useFormik } from 'formik'
import * as Yup from 'yup'
import { UserModel } from '../../core/model'
import { getUserByToken, login } from '../../core/request'
import { useAuth } from '../../core/Auth'
import { Link } from 'react-router-dom'

const initialValues: UserModel = {
	email: '',
	password: '',
}
const registrationSchema = Yup.object().shape({
	email: Yup.string().email().required('Email is required').label('Email'),
	password: Yup.string().required().label('Password'),
})
export function Login() {
	const { saveAuth, setCurrentUser } = useAuth()
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: initialValues,
		validationSchema: registrationSchema,
		onSubmit: async (
			values: FormikValues,
			{ setStatus, setSubmitting }: any
		) => {
			try {
				const data = await login(values.email, values.password)
				saveAuth(data)
				const user = await getUserByToken()
				setCurrentUser(user)
			} catch (error: any) {
				saveAuth(undefined)
				setStatus(
					error.response.data.message || 'The login detail is incorrect'
				)
				setSubmitting(false)
			}
		},
	})
	return (
		<>
			{/* {formik.status && <div>{formik.status}</div>} */}
			<div className='form-wrapper row pb-3 p-md-5 w-75 m-auto mt-5 '>
				<form
					className='row g-3 needs-validation'
					noValidate
					onSubmit={formik.handleSubmit}
				>
					<h1 className='text-center'> Login</h1>

					<div className='col-10 input-wrapper col-md-8 m-auto my-2'>
						<label htmlFor='validationCustomUsername' className='form-label'>
							Email
						</label>
						<div className='input-group'>
							<input
								type='text'
								className='form-control rounded'
								id='validationCustomUsername'
								placeholder='Email'
								aria-describedby='inputGroupPrepend'
								required
								{...formik.getFieldProps('email')}
							/>
							<div className='invalid-feedback'>Please choose a username.</div>
						</div>
					</div>

					<div className='col-10 input-wrapper col-md-8 m-auto my-2'>
						<label htmlFor='validationCustom01' className='form-label'>
							Password{' '}
						</label>
						<input
							type='password'
							className='form-control'
							id='validationCustom01'
							placeholder='Password'
							required
							{...formik.getFieldProps('password')}
						/>
						<div className='valid-feedback'>Looks good!</div>
					</div>

					<div className='col-10 input-wrapper col-md-8 m-auto py-3'>
						<button
							className='btn  w-100 login-btn'
							type='submit'
							id='login-btn'
						>
							login
						</button>
					</div>

					<div className=' col-7 col-md-8 col m-auto my-2'>
						<p>
							Don't have an account?{' '}
							<span>
								<Link
									to='/auth/signup'
									className='text-decoration-none login_link'
								>
									Sign up
								</Link>
							</span>
						</p>
					</div>
				</form>
			</div>
			{/* end::Form group */}
		</>
	)
}
