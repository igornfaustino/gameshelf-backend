import { userSchema } from '../../modules/auth/validations/user';
import { Unauthorized } from '../../modules/shared/errors/Unauthorized';
import { authorize, unauthorize } from '../../modules/shared/helpers/authResponses';
import { CreateUserFeature } from './CreateUserFeature';

type Args = {
	name: string,
	password: string,
	email: string
};

export class CreateUserController {
	constructor(
		private getUsersGamesBySituationFeature: CreateUserFeature,
	) {}

	handle = async (_obj: any, args: Args) => {
		try {
			const newUser = await userSchema.validate(args);
			const result = await this.getUsersGamesBySituationFeature.execute(newUser);
			return authorize(result);
		} catch (error) {
			if (error instanceof Unauthorized) return unauthorize('duplicate_user');
			return unauthorize('something_went_wrong');
		}
	};
}
