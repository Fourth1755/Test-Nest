import { Anime } from "src/animes/entities/anime.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string

    @ManyToMany(()=>Anime)
    @JoinTable()
    animes: Anime[];


}
