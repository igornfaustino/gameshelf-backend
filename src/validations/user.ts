import * as yup from 'yup';

export const userSchema = yup.object().shape({
	name: yup.string().required('required'),
	email: yup.string().email('email invalid').required('required'),
	password: yup
		.string()
		.min(6, 'minimum length#{"min": 6}')
		.required('required'),
});
