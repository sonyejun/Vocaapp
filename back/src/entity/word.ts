import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Folder } from "./Folder";

@Entity('words')
export class Word{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    word: string;

    @Column({ nullable: false })
    translation: string;

    @Column({ nullable: false, default: false })
    memorized: boolean;

    @Column({ nullable: false })
    sentence: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Folder, folder => folder.words, { nullable: false, onDelete: "CASCADE" })
    folder: Folder;
}