import { MigrationInterface, QueryRunner } from 'typeorm';

export class relatePlatformToGames1613990753775 implements MigrationInterface {
	name = 'relatePlatformToGames1613990753775';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'CREATE TABLE `games_platforms_platforms` (`gamesId` int NOT NULL, `platformsId` int NOT NULL, INDEX `IDX_4b21c6613c6f02c52206dababb` (`gamesId`), INDEX `IDX_ff408be3cb15c2c316365ff574` (`platformsId`), PRIMARY KEY (`gamesId`, `platformsId`)) ENGINE=InnoDB',
		);
		await queryRunner.query(
			'ALTER TABLE `games_platforms_platforms` ADD CONSTRAINT `FK_4b21c6613c6f02c52206dababb4` FOREIGN KEY (`gamesId`) REFERENCES `games`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
		);
		await queryRunner.query(
			'ALTER TABLE `games_platforms_platforms` ADD CONSTRAINT `FK_ff408be3cb15c2c316365ff574e` FOREIGN KEY (`platformsId`) REFERENCES `platforms`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'ALTER TABLE `games_platforms_platforms` DROP FOREIGN KEY `FK_ff408be3cb15c2c316365ff574e`',
		);
		await queryRunner.query(
			'ALTER TABLE `games_platforms_platforms` DROP FOREIGN KEY `FK_4b21c6613c6f02c52206dababb4`',
		);
		await queryRunner.query('DROP TABLE `games_platforms_platforms`');
	}
}
