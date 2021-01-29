import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateGenreTable1611880371515 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner.createTable(
			new Table({
				name: 'genres',
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
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('genres');
	}
}
