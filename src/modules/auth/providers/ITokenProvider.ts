export type TokenContent = {
	email: string
	name: string
	id: string
};

export interface ITokenProvider {
	create(content: TokenContent): string
}
