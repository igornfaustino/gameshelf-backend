import { Model } from 'objection';

export default class GenreModel extends Model {
	static tableName = 'genres';

	id!: number;

	name!: string;

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['name'],

			properties: {
				name: { type: 'string', minLength: 1, maxLength: 255 },
			},
		};
	}
}
