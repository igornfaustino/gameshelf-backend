import {
	Entity,
	PrimaryColumn,
	Column,
	OneToMany,
	ManyToMany,
	JoinTable,
} from 'typeorm';
import { Genre } from './Genre';
import { Platform } from './Platform';
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

	@ManyToMany(() => Platform)
	@JoinTable()
	platforms!: Platform[];

	@ManyToMany(() => Genre)
	@JoinTable()
	genres!: Genre[];
}
