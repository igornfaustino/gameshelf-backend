import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('app')
export class App {
	@PrimaryColumn()
	propName!: string;

	@Column({ nullable: false })
	value!: string;
}
