import jwt from 'jsonwebtoken';
const configs = require('../../config.json');

const { secret } = configs;

type TokenBody = {
	email: string;
	name: string;
	id: string;
};

export const generateJWT = (body: TokenBody) => {
	const token = jwt.sign(body, secret);
	return token;
};

export const parserJWT = (payload: string) => {
	try {
		const decoded = jwt.verify(payload, secret);
		return decoded;
	} catch {
		return null;
	}
};
