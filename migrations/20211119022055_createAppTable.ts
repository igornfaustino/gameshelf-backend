import { Knex } from 'knex';
import { requestAccessToken } from '../src/helpers/request';

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.createTable('app', (table) => {
			table.string('key').primary();
			table.string('value');
		})
		.then(async () => {
			const res = await requestAccessToken();
			return knex('app').insert({
				key: 'igdb_auth_token',
				value: res.data.access_token,
			});
		});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists('app');
}
