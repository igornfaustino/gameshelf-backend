import { Unauthorized } from '../../modules/shared/errors/Unauthorized';
import { unauthorize } from '../../modules/shared/helpers/authResponses';
import { Context } from '../../modules/shared/types/graphQL';
import { GetUsersGamesBySituationsFeature } from './GetUsersGamesBySituationsFeature';

type Args = {
	statusId: number
};

export class GetUsersGamesBySituationsController {
	constructor(
		private getUsersGamesBySituationFeature: GetUsersGamesBySituationsFeature,
	) {}

	handle = async (_obj: any, args: Args, context: Context) => {
		const { statusId } = args;
		const userId = context.user?.id;

		try {
			const result = await this.getUsersGamesBySituationFeature.execute({
				situationId: statusId,
				userId,
			});
			return result;
		} catch (error) {
			if (error instanceof Unauthorized) return unauthorize('user_not_found');
			throw new Error('unexpected error');
		}
	};
}
