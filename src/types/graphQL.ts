import { StringValueNode } from 'graphql';

export type Context = {
	user: {
		id: string;
		name: string;
		email: string;
	};
};
