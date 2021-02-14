import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { StatusToGame } from './StatusToGame';
@Entity('games')
export class Game {
	@PrimaryColumn()
	id!: number;

	@Column()
	name!: string;

	@Column({ nullable: true })
	cover?: string;

	@Column({ nullable: true })
	thumbnail?: string;

	@OneToMany(
		() => StatusToGame,
		(statusToGame: StatusToGame) => statusToGame.games,
	)
	gameStatus?: StatusToGame;
}
