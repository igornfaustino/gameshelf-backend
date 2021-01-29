import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('genres')
export class Genre {
	@PrimaryColumn()
	propName!: number;

	@Column({ nullable: false })
	name!: string;
}
