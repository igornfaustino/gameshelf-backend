import bcrypt from 'bcrypt';
import { getConnection } from 'typeorm';
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

const saveUser = (user: UserType) =>
	getConnection()
		.createQueryBuilder()
		.insert()
		.into(User)
		.values([user])
		.execute()
		.then((value) => {
			const id = value.identifiers[0].id;
			const authToken = generateJWT({
				id,
				email: user.email,
				name: user.name,
			});

			return {
				token: authToken,
			};
		})
		.catch((reason) => {
			// TODO: define error
			// DB error
			console.log(reason);
			return false;
		});

const getUserByEmail = (email: string) =>
	getConnection()
		.createQueryBuilder()
		.select('user')
		.from(User, 'user')
		.where('user.email = :prop', { prop: email })
		.getOne();

export const UserModel = {
	async createUser(newUser: UserType) {
		try {
			const values = await userSchema.validate(newUser);
			const { name, email, password } = values;
			const hash = await bcrypt.hash(password, saltRounds);
			return saveUser({ name, email, password: hash });
		} catch (error) {
			// Validation error
			console.log(error); // TODO: define error type
			return false;
		}
	},

	async Login(userCredentials: LoginType) {
		try {
			const values = await loginSchema.validate(userCredentials);
			const { email, password } = values;
			const user = await getUserByEmail(email);
			if (!user) {
				// user don't exist
				return false;
			}
			const isPasswordCorrect = await bcrypt.compare(password, user.password);
			if (!isPasswordCorrect) {
				// wrong password
				return false;
			}
			const authToken = generateJWT({
				id: user.id,
				email: user.email,
				name: user.name,
			});

			return {
				token: authToken,
			};
		} catch (error) {
			// Validation error
			console.log(error); // TODO: define error type
			return false;
		}
	},
};
