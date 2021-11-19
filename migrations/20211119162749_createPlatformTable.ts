import Knex, { Knex as KnexType } from 'knex';
import { Model } from 'objection';
import { getPlatforms } from '../src/connectors/igdb';

const knexConfig = require('../knexfile');

export async function up(knex: KnexType): Promise<void> {
	return knex.schema
		.createTable('platforms', (table) => {
			table.integer('id').primary();
			table.string('name');
			table.string('abbreviation');
		})
		.then(async () => {
			const conn = Knex(knexConfig);
			Model.knex(conn);

			const platforms = await getPlatforms();
			return knex('platforms').insert(platforms);
		});
}

export async function down(knex: KnexType): Promise<void> {
	return knex.schema.dropTableIfExists('platforms');
}
