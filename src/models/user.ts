import bcrypt from 'bcrypt';
import { getConnection, getRepository } from 'typeorm';
import { User } from '../entity/User';
import { generateJWT } from '../helpers/jwt';
import { userSchema, loginSchema } from '../validations/user';

type UserType = {
	name: string;
	email: string;
	password: string;
};

type LoginType = {
	email: string;
	password: string;
};

const saltRounds = 10;

const authorize = (token: string) => ({ token });
const unauthorize = (reason: string) => ({ reason });

const saveUser = (user: UserType) =>
	getRepository(User)
		.save(user)
		.then((value) => {
			const authToken = generateJWT({
				id: value.id,
				email: value.email,
				name: value.name,
			});

			return authorize(authToken);
		})
		.catch((error) => {
			console.log(error);
			switch (error.code) {
				case 'ER_DUP_ENTRY':
					return unauthorize('duplicate_user');
				default:
					return unauthorize('something_went_wrong');
			}
		});

const getUserByEmail = (email: string) =>
	getRepository(User).findOne({
		where: { email },
	});

export const UserModel = {
	async createUser(newUser: UserType) {
		const values = await userSchema.validate(newUser);
		const { name, email, password } = values;
		const hash = await bcrypt.hash(password, saltRounds);
		return saveUser({ name, email, password: hash });
	},

	async Login(userCredentials: LoginType) {
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
	},
};
