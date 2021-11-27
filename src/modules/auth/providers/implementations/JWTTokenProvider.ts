import jwt from 'jsonwebtoken';
import { SECRET } from '../../../shared/helpers/env';
import { ITokenProvider, TokenContent } from '../ITokenProvider';

export class JWTTokenProvider implements ITokenProvider {
	static parserJWT(payload: string) {
		try {
			const [, token] = payload.split(' ');
			const decoded = jwt.verify(token, SECRET);
			return decoded;
		} catch {
			return null;
		}
	}

	create(content: TokenContent): string {
		const token = jwt.sign(content, SECRET);
		return token;
	}
}
