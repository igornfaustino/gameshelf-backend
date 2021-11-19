import jwt from 'jsonwebtoken';
import { SECRET } from './env';

type TokenBody = {
	email: string;
	name: string;
	id: string;
};

export const generateJWT = (body: TokenBody) => {
	const token = jwt.sign(body, SECRET);
	return token;
};

export const parserJWT = (payload: string) => {
	try {
		const [, token] = payload.split(' ');
		const decoded = jwt.verify(token, SECRET);
		return decoded;
	} catch {
		return null;
	}
};
