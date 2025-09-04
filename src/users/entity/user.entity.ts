import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid') // <- genera un UUID automáticamente
    id: number;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    userName: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @Column({default: true})
    status: boolean;

}
