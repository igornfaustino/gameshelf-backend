export interface IPasswordProvider {
	hash(password: string): string

	compare(password: string, hashedPassword: string): boolean
}
