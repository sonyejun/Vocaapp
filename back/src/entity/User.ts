import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, AfterInsert, CreateDateColumn, UpdateDateColumn, BeforeUpdate, OneToMany } from "typeorm"
import bcrypt from 'bcryptjs';
import { RefreshToken } from "./RefreshToken";
import { Folder } from "./Folder";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true, nullable: false })
    email: string

    @Column({nullable: false })
    password: string

    @Column({nullable: false })
    username: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => RefreshToken, refreshToken => refreshToken.user)
    refreshTokens: RefreshToken[];

    @OneToMany(() => Folder, folder => folder.user)
    folders: Folder[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        } catch (error) {
            console.error("Error hashing password: ", error);
        }
    }

    async comparePassword(plainPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, this.password);
    }
};
