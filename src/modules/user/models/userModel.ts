import { Model } from 'objection';

export default class UserModel extends Model {
	static tableName = 'users';

	id!: string;
	name!: string;
	email!: string;
	password!: string;

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['name', 'email', 'password'],

			properties: {
				name: { type: 'string', minLength: 1, maxLength: 255 },
				email: { type: 'string', minLength: 1, maxLength: 255 },
				password: { type: 'string', minLength: 1, maxLength: 255 },
			},
		};
	}
}
