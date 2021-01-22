module.exports = {
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'teste',
	password: 'password',
	database: 'gameshelf',
	entities: ['src/entity/**/*.ts'],
	migrations: ['src/migration/**/*.ts'],
	cli: {
		migrationsDir: 'src/migration/',
	},
};
