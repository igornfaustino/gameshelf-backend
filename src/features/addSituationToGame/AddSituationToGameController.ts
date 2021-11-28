import { Unauthorized } from '../../modules/shared/errors/Unauthorized';
import { unauthorize } from '../../modules/shared/helpers/authResponses';
import { Context } from '../../modules/shared/types/graphQL';
import { AddSituationToGameFeature } from './AddSituationToGameFeature';

type Args = {
	gameId: number,
	statusId: number
};

export class AddSituationsToGameController {
	constructor(
		private addSituationToGameFeature: AddSituationToGameFeature,
	) {}

	handle = async (_obj: any, args: Args, context: Context) => {
		const { gameId, statusId } = args;
		const userId = context.user?.id;

		try {
			const result = await this.addSituationToGameFeature.execute({
				gameId,
				userId,
				situationId: statusId,
			});

			return result;
		} catch (error) {
			if (error instanceof Unauthorized) return unauthorize('invalid_credentials');
			return unauthorize('something_went_wrong');
		}
	};
}
