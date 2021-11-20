import { prisma } from '../../../../prisma';

export const getIgdbToken = async () => {
	const entry = await prisma.appSettings.findUnique({ where: { key: 'igdb_auth_token' } });
	return entry?.value;
};

export const saveIgdbToken = async (token: string) => prisma.appSettings.upsert({
	where: { key: 'igdb_auth_token' },
	create: {
		key: 'igdb_auth_token',
		value: token,
	},
	update: {
		value: token,
	},
});
