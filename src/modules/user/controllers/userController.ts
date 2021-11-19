import bcrypt from 'bcrypt';
import { ConstraintViolationError } from 'objection';
import { generateJWT } from '../../../helpers/jwt';
import { authorize, unauthorize } from '../../shared/helpers/authResponses';
import UserModel from '../models/userModel';

import { LoginType, UserType } from '../types/userTypes';
import { loginSchema, userSchema } from '../validations/user';

const saltRounds = 10;

const saveUser = (user: UserType) => UserModel.query()
	.insert(user)
	.then((newUser) => {
		const authToken = generateJWT({
			id: newUser.id,
			email: newUser.email,
			name: newUser.name,
		});
		return authorize(authToken);
	})
	.catch((error) => {
		if (error instanceof ConstraintViolationError) {
			return unauthorize('duplicate_user');
		}
		return unauthorize('something_went_wrong');
	});

const getUserByEmail = (email: string) => UserModel.query().where('email', email).first();

export const createUser = async (newUser: UserType) => {
	const values = await userSchema.validate(newUser);
	const { name, email, password } = values;
	const hash = await bcrypt.hash(password, saltRounds);
	return saveUser({ name, email, password: hash });
};

export const login = async (userCredentials: LoginType) => {
	const values = await loginSchema.validate(userCredentials);
	const { email, password } = values;
	const user = await getUserByEmail(email);
	if (!user) return unauthorize('invalid_credentials');

	const isPasswordCorrect = await bcrypt.compare(password, user.password);
	if (!isPasswordCorrect) return unauthorize('invalid_credentials');

	const authToken = generateJWT({
		id: user.id,
		email: user.email,
		name: user.name,
	});

	return authorize(authToken);
};
