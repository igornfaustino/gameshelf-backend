import jwt from 'jsonwebtoken';
import { SECRET } from '../../../shared/helpers/env';
import { ITokenProvider, TokenContent } from '../ITokenProvider';

export class JWTTokenProvider implements ITokenProvider {
	create(content: TokenContent): string {
		const token = jwt.sign(content, SECRET);
		return token;
	}
}
