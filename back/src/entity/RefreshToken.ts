import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";

@Entity('refresh_tokens')
export class RefreshToken {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    token: string;
  
    @Column()
    userId: number;

    @CreateDateColumn()
    createAt: Date

    @ManyToOne(() => User, user => user.refreshTokens,{ nullable: false })
    user: User;
};
