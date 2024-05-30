import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';

@Entity('folders')
export class Folder {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    foldername: string

    @Column({nullable: false})
    description: string

    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updateAt: Date
    
    @ManyToOne(() => User, user => user.folders,{ nullable: false })
    user: User;
}