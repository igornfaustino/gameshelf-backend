import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateGameStatusTable1611883950139 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'game_status',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'name',
						type: 'varchar',
					},
				],
			}),
		);

		await queryRunner.manager
			.createQueryBuilder()
			.insert()
			.into('game_status', ['name'])
			.values([
				{ name: 'to play' },
				{ name: 'playing' },
				{ name: 'completed' },
				{ name: 'abandoned' },
			])
			.execute();
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('game_status');
	}
}
