import { Unauthorized } from '../../modules/shared/errors/Unauthorized';
import { unauthorize } from '../../modules/shared/helpers/authResponses';
import { Context } from '../../modules/shared/types/graphQL';
import { RemoveGameSituationFeature } from './RemoveGameSituationFeature';

type Args = {
	gameId: number,
};

export class RemoveGameSituationController {
	constructor(
		private removeGameSituationFeature: RemoveGameSituationFeature,
	) {}

	handle = async (_obj: any, args: Args, context: Context) => {
		const { gameId } = args;
		const userId = context.user?.id;

		try {
			const result = await this.removeGameSituationFeature.execute({
				gameId: Number(gameId),
				userId,
			});

			return result;
		} catch (error) {
			console.log(error);
			if (error instanceof Unauthorized) return unauthorize('invalid_credentials');
			return unauthorize('something_went_wrong');
		}
	};
}
