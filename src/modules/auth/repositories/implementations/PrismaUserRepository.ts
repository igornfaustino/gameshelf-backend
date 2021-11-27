import { prisma } from '../../../../config/prisma';
import { IUser } from '../../types/userTypes';
import { IUserRepository } from '../IUserRepository';

export class PrismaUserRepository implements IUserRepository {
	createUser(user: IUser): Promise<IUser> {
		return prisma.user.create({ data: user });
	}

	getUserByEmail(email: string): Promise<IUser | null> {
		return prisma.user.findUnique({ where: { email } });
	}
}
