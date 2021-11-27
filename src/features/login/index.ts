import { BcryptPasswordProvider } from '../../modules/auth/providers/implementations/BcryptPasswordProvider';
import { JWTTokenProvider } from '../../modules/auth/providers/implementations/JWTTokenProvider';
import { PrismaUserRepository } from '../../modules/auth/repositories/implementations/PrismaUserRepository';
import { LoginController } from './LoginController';
import { LoginFeature } from './LoginFeature';

const userRepository = new PrismaUserRepository();
const bcryptPasswordProvider = new BcryptPasswordProvider();
const jwtTokenProvider = new JWTTokenProvider();
const loginFeature = new LoginFeature(
	userRepository, bcryptPasswordProvider, jwtTokenProvider,
);
const loginController = new LoginController(
	loginFeature,
);

export {
	loginController,
	loginFeature,
};
