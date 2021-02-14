import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('genres')
export class Genre {
	@PrimaryColumn()
	id!: number;

	@Column({ nullable: false })
	name!: string;
}
