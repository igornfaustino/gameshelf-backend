import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreteAppTable1610965707865 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner.createTable(
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
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
