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
