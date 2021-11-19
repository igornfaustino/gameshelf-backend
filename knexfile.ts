require('dotenv').config('.env');

module.exports = {
	client: 'pg',
	connection: process.env.DATABASE_URL,
};
