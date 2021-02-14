import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('platforms')
export class Platform {
	@PrimaryColumn()
	id!: number;

	@Column({ nullable: false })
	name!: string;

	@Column()
	abbreviation!: string;
}
