export interface IPasswordProvider {
	hash(password: string): string
}
