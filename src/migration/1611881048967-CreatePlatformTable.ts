import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePlatformTable1611881048967 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner.createTable(
			new Table({
				name: 'platforms',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: false,
					},
					{
						name: 'name',
						type: 'varchar',
					},
					{
						name: 'abbreviation',
						type: 'varchar',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('platforms');
	}
}
