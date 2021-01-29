import { Entity, PrimaryColumn, Column } from 'typeorm';

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
}
