import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateGameTable1611881716846 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner.createTable(
			new Table({
				name: 'games',
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
						name: 'cover',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'thumbnail',
						type: 'varchar',
						isNullable: true,
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('games');
	}
}
