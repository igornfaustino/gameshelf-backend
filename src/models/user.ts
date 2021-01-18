import bcrypt from 'bcrypt';
import { getConnection } from 'typeorm';
import { User } from '../entity/User';

type UserType = {
	name: string;
	email: string;
	password: string;
};

const saltRounds = 10;

export const UserModel = {
	async createUser(newUser: UserType) {
		const { name, email, password } = newUser;
		const hash = await bcrypt.hash(password, saltRounds);
		return getConnection()
			.createQueryBuilder()
			.insert()
			.into(User)
			.values([{ name, email, password: hash }])
			.execute()
			.then(() => true)
			.catch((reason) => {
				console.log(reason);
				return false;
			});
	},
};
