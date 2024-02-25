/* eslint-disable jsx-a11y/anchor-is-valid */
import { FormikValues, useFormik } from 'formik'
import * as Yup from 'yup'
import { UserModel } from '../../core/model'
import { register } from '../../core/request'
import { Link, useNavigate } from 'react-router-dom'

const initialValues: UserModel = {
	firstname: '',
	lastname: '',
	email: '',
	phone: '',
	password: '',
}
const registrationSchema = Yup.object().shape({
	firstname: Yup.string().required().label('First Name'),
	email: Yup.string().email().required('Email is required').label('Email'),
	phone: Yup.string().label('Phone Number is required'),
	lastname: Yup.string().required('Last name is required'),
	password: Yup.string().required().label('Password'),
	confirm_password: Yup.string().oneOf(
		[Yup.ref('password')],
		'Passwords must match'
	),
})
export function Signup() {
	const navigate = useNavigate()
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: initialValues,
		validationSchema: registrationSchema,
		onSubmit: async (values: FormikValues, { setStatus }: any) => {
			try {
				setStatus()
				await register(values)
				navigate('/auth/login')
			} catch (error) {
				setStatus('The signup details is incorrect')
			}
		},
	})
	return (
		<div className='form-wrapper row pb-3 p-md-5 w-50 m-auto mt-5 '>
			<form
				className='row g-3 needs-validation'
				noValidate
				onSubmit={formik.handleSubmit}
			>
				<h1 className='text-center'> SignUp</h1>
				<div className='col-10 input-wrapper col-md-8 m-auto'>
					<label htmlFor='validationCustom01' className='form-label'>
						First Name
					</label>
					<input
						type='text'
						className='form-control'
						id='validationCustom01'
						placeholder='First Name'
						required
						{...formik.getFieldProps('firstname')}
					/>
					<div className='valid-feedback'>Looks good!</div>
				</div>
				<div className='col-10 input-wrapper col-md-8 m-auto'>
					<label htmlFor='validationCustom02' className='form-label'>
						Last Name
					</label>
					<input
						type='text'
						className='form-control'
						id='validationCustom02'
						placeholder='Last Name'
						required
						{...formik.getFieldProps('lastname')}
					/>
					<div className='valid-feedback'>Email</div>
				</div>
				<div className='col-10 input-wrapper col-md-8 m-auto'>
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

				<div className='col-10 input-wrapper col-md-8 m-auto'>
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

				<div className='col-10 input-wrapper col-md-8 m-auto '>
					<label htmlFor='validationCustom01' className='form-label'>
						Confirm password
					</label>
					<input
						type='text'
						className='form-control'
						id='validationCustom01'
						placeholder='Confirm password'
						required
						{...formik.getFieldProps('confirm_password')}
					/>
					<div className='valid-feedback'>Looks good!</div>
				</div>

				<div className='col-10 input-wrapper col-md-8 m-auto py-3'>
					<button
						className='btn w-100 sign_up-btn'
						type='submit'
						id='signup-btn'
					>
						Signup
					</button>
				</div>

				<div className=' col-7 col-md-8 col m-auto border-0'>
					<p>
						Don't have an account?{' '}
						<span>
							<Link
								to='/auth/login'
								className='text-decoration-none login_link'
							>
								Login
							</Link>
						</span>
					</p>
				</div>
			</form>
		</div>
	)
}
