import { Game } from '../../modules/games/types/game';
import { Context } from '../../modules/shared/types/graphQL';
import { GetSituationByGameFeature } from './GetSituationByGameFeature';

export class GetSituationsByGameController {
	constructor(
		private getSituationByGameFeature: GetSituationByGameFeature,
	) {}

	handle = async (obj: Game, _args: any, context: Context) => {
		const { id } = obj;
		const userId = context.user?.id;

		try {
			const result = await this.getSituationByGameFeature.execute({
				gameId: id,
				userId,
			});
			return result;
		} catch (error) {
			throw new Error('unexpected error');
		}
	};
}
