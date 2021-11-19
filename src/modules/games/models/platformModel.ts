import { Model } from 'objection';

export default class PlatformModel extends Model {
	static tableName = 'platforms';

	id!: number;

	name!: string;

	abbreviation!: string;

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['name', 'abbreviation'],

			properties: {
				name: { type: 'string', minLength: 1, maxLength: 255 },
				abbreviation: { type: 'string', minLength: 1, maxLength: 255 },
			},
		};
	}
}
