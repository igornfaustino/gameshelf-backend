import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { StatusToGame } from './StatusToGame';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ nullable: false })
	name!: string;

	@Column({ nullable: false, unique: true })
	email!: string;

	@Column({ nullable: false })
	password!: string;

	@OneToMany(
		() => StatusToGame,
		(statusToGame: StatusToGame) => statusToGame.games,
	)
	games?: StatusToGame;
}
