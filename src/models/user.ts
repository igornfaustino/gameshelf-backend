import bcrypt from 'bcrypt';
import { getConnection } from 'typeorm';
import { User } from '../entity/User';
import { userSchema } from '../validations/user';

type UserType = {
	name: string;
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
		.then(() => true)
		.catch((reason) => {
			// TODO: define error
			// DB error
			console.log(reason);
			return false;
		});

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
};
