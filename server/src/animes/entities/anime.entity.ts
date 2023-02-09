import { Account } from 'src/accounts/entities/account.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
@Entity()

export class Anime {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    episode: number;

    @Column()
    image: string;

    @Column()
    year: number;

    @Column()
    score: number;
}
