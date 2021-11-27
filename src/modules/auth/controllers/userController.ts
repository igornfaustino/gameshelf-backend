import bcrypt from 'bcrypt';
import { prisma } from '../../../config/prisma';
import { authorize, unauthorize } from '../../shared/helpers/authResponses';
import { generateJWT } from '../../shared/helpers/jwt';

import { LoginType } from '../types/userTypes';
import { loginSchema } from '../validations/user';

const getUserByEmail = (email: string) => prisma.user.findUnique({ where: { email } });

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
