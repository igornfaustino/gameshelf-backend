import { IUser } from '../types/userTypes';

export interface IUserRepository {
	createUser(user: IUser): Promise<IUser>
	getUserByEmail(email: string): Promise<IUser | null>
}
