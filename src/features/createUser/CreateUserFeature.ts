import { v4 as uuidV4 } from 'uuid';
import { IPasswordProvider } from '../../modules/auth/providers/IPasswordProvider';
import { ITokenProvider } from '../../modules/auth/providers/ITokenProvider';
import { IUserRepository } from '../../modules/auth/repositories/IUserRepository';
import { Unauthorized } from '../../modules/shared/errors/Unauthorized';
import { CreateUserDTO } from './CreateUserDTO';

export class CreateUserFeature {
	constructor(
		private userRepository: IUserRepository,
		private passwordProvider: IPasswordProvider,
		private tokenProvider: ITokenProvider,
	) {}

	async execute(args: CreateUserDTO) {
		const { email, name, password } = args;

		const existingUser = await this.userRepository.getUserByEmail(email);
		if (existingUser) throw new Unauthorized();

		const id = uuidV4();
		const hashedPassword = this.passwordProvider.hash(password);

		const user = await this.userRepository.createUser({
			id,
			email,
			name,
			password: hashedPassword,
		});

		const tokenContent = {
			id: user.id,
			name: user.name,
			email: user.email,
		};

		return this.tokenProvider.create(tokenContent);
	}
}
