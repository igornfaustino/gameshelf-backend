import { loginSchema } from '../../modules/auth/validations/user';
import { Unauthorized } from '../../modules/shared/errors/Unauthorized';
import { authorize, unauthorize } from '../../modules/shared/helpers/authResponses';
import { LoginFeature } from './LoginFeature';

type Args = {
	password: string,
	email: string
};

export class LoginController {
	constructor(
		private loginFeature: LoginFeature,
	) {}

	handle = async (_obj: any, args: Args) => {
		try {
			const user = await loginSchema.validate(args);
			const result = await this.loginFeature.execute(user);
			return authorize(result);
		} catch (error) {
			if (error instanceof Unauthorized) return unauthorize('invalid_credentials');
			return unauthorize('something_went_wrong');
		}
	};
}
