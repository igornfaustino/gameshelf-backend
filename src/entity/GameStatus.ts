import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { StatusToGame } from './StatusToGame';

@Entity('game_status')
export class Status {
	@PrimaryGeneratedColumn('increment')
	id!: number;

	@Column({ nullable: false })
	name!: string;

	@OneToMany(
		() => StatusToGame,
		(statusToGame: StatusToGame) => statusToGame.status,
	)
	gameStatus?: StatusToGame[];
}
