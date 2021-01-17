import { getConnection } from 'typeorm';
import { User } from '../entity/User';

type UserType = {
	name: string;
	email: string;
	password: string;
};

export const UserModel = {
	createUser(newUser: UserType) {
		return getConnection()
			.createQueryBuilder()
			.insert()
			.into(User)
			.values([newUser])
			.execute()
			.then(() => true)
			.catch((reason) => {
				console.log(reason);
				return false;
			});
	},
};
