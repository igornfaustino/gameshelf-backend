import bcrypt from 'bcrypt';
import { IPasswordProvider } from '../IPasswordProvider';

export class BcryptPasswordProvider implements IPasswordProvider {
	private saltRounds = 10;

	hash(password: string): string {
		return bcrypt.hashSync(password, this.saltRounds);
	}
}
