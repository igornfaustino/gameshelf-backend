import Knex, { Knex as KnexType } from 'knex';
import { Model } from 'objection';
import { getGenres } from '../src/connectors/igdb';

const knexConfig = require('../knexfile');

export async function up(knex: KnexType): Promise<void> {
	return knex.schema
		.createTable('genres', (table) => {
			table.integer('id').primary();
			table.string('name');
		})
		.then(async () => {
			const conn = Knex(knexConfig);
			Model.knex(conn);

			const genres = await getGenres();
			return knex('genres').insert(genres);
		});
}

export async function down(knex: KnexType): Promise<void> {
	return knex.schema.dropTableIfExists('genres');
}
