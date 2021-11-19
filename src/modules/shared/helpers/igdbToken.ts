import AppModel from '../model/app';

export const getIgdbToken = async () => {
	const entry = await AppModel.query().findOne('key', 'igdb_auth_token');
	return entry?.value;
};
