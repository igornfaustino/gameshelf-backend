import bcrypt from 'bcrypt';
import { IPasswordProvider } from '../IPasswordProvider';

export class BcryptPasswordProvider implements IPasswordProvider {
	private saltRounds = 10;

	compare(password: string, hashedPassword: string): boolean {
		return bcrypt.compareSync(password, hashedPassword);
	}

	hash(password: string): string {
		return bcrypt.hashSync(password, this.saltRounds);
	}
}
