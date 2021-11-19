import { Model } from 'objection';

export default class AppModel extends Model {
	static tableName = 'app';

	key!: string;

	value!: string;
}
