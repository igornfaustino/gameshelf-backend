import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { requestAccessToken } from '../helpers/request';

export class CreteAppTable1610965707865 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'app',
				columns: [
					{
						name: 'propName',
						type: 'varchar',
						isPrimary: true,
					},
					{
						name: 'value',
						type: 'varchar',
					},
				],
			}),
		);

		const res = await requestAccessToken();

		await queryRunner.manager
			.createQueryBuilder()
			.insert()
			.into('app', ['propName', 'value'])
			.values({ propName: 'igdb_auth_token', value: res.data.access_token })
			.execute();
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('app');
	}
}
