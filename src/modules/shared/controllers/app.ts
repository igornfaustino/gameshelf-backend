import { prisma } from '../../../db';

export const getIgdbToken = async () => {
	const entry = await prisma.app.findUnique({ where: { key: 'igdb_auth_token' } });
	return entry?.value;
};

export const saveIgdbToken = async (token: string) => prisma.app.upsert({
	where: { key: 'igdb_auth_token' },
	create: {
		key: 'igdb_auth_token',
		value: token,
	},
	update: {
		value: token,
	},
});
