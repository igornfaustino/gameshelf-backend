import { BcryptPasswordProvider } from '../../modules/auth/providers/implementations/BcryptPasswordProvider';
import { JWTTokenProvider } from '../../modules/auth/providers/implementations/JWTTokenProvider';
import { PrismaUserRepository } from '../../modules/auth/repositories/implementations/PrismaUserRepository';
import { CreateUserController } from './CreateUserController';
import { CreateUserFeature } from './CreateUserFeature';

const userRepository = new PrismaUserRepository();
const bcryptPasswordProvider = new BcryptPasswordProvider();
const jwtTokenProvider = new JWTTokenProvider();
const createUserFeature = new CreateUserFeature(
	userRepository, bcryptPasswordProvider, jwtTokenProvider,
);
const createUserController = new CreateUserController(
	createUserFeature,
);

export {
	createUserController,
	createUserFeature,
};
