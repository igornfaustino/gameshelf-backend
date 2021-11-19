import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
} from 'typeorm';

export class CreateListToGameTable1612525985887 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'statusToGame',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{ name: 'gameId', type: 'int' },
					{ name: 'statusId', type: 'int' },
					{ name: 'userId', type: 'varchar' },
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'CURRENT_TIMESTAMP',
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'CURRENT_TIMESTAMP',
						onUpdate: 'CURRENT_TIMESTAMP',
					},
				],
			}),
		);
		await queryRunner.createForeignKey(
			'statusToGame',
			new TableForeignKey({
				columnNames: ['gameId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'games',
				onDelete: 'CASCADE',
			}),
		);
		await queryRunner.createForeignKey(
			'statusToGame',
			new TableForeignKey({
				columnNames: ['statusId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'game_status',
				onDelete: 'CASCADE',
			}),
		);
		await queryRunner.createForeignKey(
			'statusToGame',
			new TableForeignKey({
				columnNames: ['userId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'users',
				onDelete: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('statusToGame');
	}
}
