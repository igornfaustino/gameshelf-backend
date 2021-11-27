import { IPasswordProvider } from '../../modules/auth/providers/IPasswordProvider';
import { ITokenProvider } from '../../modules/auth/providers/ITokenProvider';
import { IUserRepository } from '../../modules/auth/repositories/IUserRepository';
import { Unauthorized } from '../../modules/shared/errors/Unauthorized';
import { LoginDTO } from './LoginDTO';

export class LoginFeature {
	constructor(
		private userRepository: IUserRepository,
		private passwordProvider: IPasswordProvider,
		private tokenProvider: ITokenProvider,
	) {}

	async execute(args: LoginDTO) {
		const { email, password } = args;

		const user = await this.userRepository.getUserByEmail(email);
		if (!user) throw new Unauthorized();

		const isPasswordCorrectly = this.passwordProvider.compare(password, user.password);
		if (!isPasswordCorrectly) throw new Unauthorized();

		const tokenContent = {
			id: user.id,
			name: user.name,
			email: user.email,
		};

		return this.tokenProvider.create(tokenContent);
	}
}
