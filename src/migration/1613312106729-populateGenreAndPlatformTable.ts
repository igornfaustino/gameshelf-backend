import { MigrationInterface, QueryRunner } from 'typeorm';
import { getGenres, getPlatforms } from '../connectors/igdb';
import { Genre } from '../types/game';

export class populateGenreAndPlatformTable1613312106729
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const genres = await getGenres();
		const platforms = await getPlatforms();

		console.log(genres);

		await queryRunner.manager
			.createQueryBuilder()
			.insert()
			.into('genres', ['id', 'name'])
			.values(genres)
			.execute();

		await queryRunner.manager
			.createQueryBuilder()
			.insert()
			.into('platforms', ['id', 'name', 'abbreviation'])
			.values(platforms)
			.execute();
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const genresIds = (await getGenres()).map(({ id }) => id);
		const platformsIds = (await getPlatforms()).map(({ id }) => id);

		await queryRunner.manager
			.createQueryBuilder()
			.delete()
			.from('genres')
			.whereInIds(genresIds)
			.execute();

		await queryRunner.manager
			.createQueryBuilder()
			.delete()
			.from('platforms')
			.whereInIds(platformsIds)
			.execute();
	}
}
