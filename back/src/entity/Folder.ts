import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { Word } from './word';

@Entity('folders')
export class Folder {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    foldername: string

    @Column({nullable: false})
    description: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
    
    @ManyToOne(() => User, user => user.folders,{ nullable: false })
    user: User;

    @OneToMany(() => Word, word => word.folder)
    words: Word[];
}