import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { Game } from './Game';
import { User } from './User';
import { Status } from './GameStatus';

@Entity('statusToGame')
export class StatusToGame {
	@PrimaryGeneratedColumn('increment')
	id!: number;

	@Column()
	gameId!: number;

	@Column()
	statusId!: number;

	@Column()
	userId!: string;

	@ManyToOne(() => Game, (games: Game) => games.gameStatus)
	@JoinColumn({ name: 'gameId' })
	games!: Game;

	@ManyToOne(() => User, (users: User) => users.games)
	@JoinColumn({ name: 'userId' })
	users!: User;

	@ManyToOne(() => Status, (status: Status) => status.gameStatus)
	@JoinColumn({ name: 'statusId' })
	status!: Status;
}
