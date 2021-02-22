import { MigrationInterface, QueryRunner } from 'typeorm';

export class relateGenreToGames1613990860202 implements MigrationInterface {
	name = 'relateGenreToGames1613990860202';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'CREATE TABLE `games_genres_genres` (`gamesId` int NOT NULL, `genresId` int NOT NULL, INDEX `IDX_d3ac65ea9002de25d3d841d2b6` (`gamesId`), INDEX `IDX_5d59ed8cbec8cc23ca2c251545` (`genresId`), PRIMARY KEY (`gamesId`, `genresId`)) ENGINE=InnoDB',
		);
		await queryRunner.query(
			'ALTER TABLE `games_genres_genres` ADD CONSTRAINT `FK_d3ac65ea9002de25d3d841d2b62` FOREIGN KEY (`gamesId`) REFERENCES `games`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE `games_genres_genres` ADD CONSTRAINT `FK_5d59ed8cbec8cc23ca2c2515455` FOREIGN KEY (`genresId`) REFERENCES `genres`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'ALTER TABLE `games_genres_genres` DROP FOREIGN KEY `FK_5d59ed8cbec8cc23ca2c2515455`',
		);
		await queryRunner.query(
			'ALTER TABLE `games_genres_genres` DROP FOREIGN KEY `FK_d3ac65ea9002de25d3d841d2b62`',
		);
		await queryRunner.query('DROP TABLE `games_genres_genres`');
	}
}
