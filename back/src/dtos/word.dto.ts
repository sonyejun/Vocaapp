import { Word } from "../entity/word";

export class WordDto {
    id: number;
    word: string;
    translation: string;
    sentence: string
    memorized: boolean;
    folderId: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(
    wordObj: {
        id: number,
        word: string,
        translation: string,
        sentence: string,
        memorized: boolean,
        folderId: number,
        createdAt: Date,
        updatedAt: Date
    }) {
        const { id, word, translation, sentence, memorized, folderId, createdAt, updatedAt } = wordObj;
        this.id = id;
        this.word = word;
        this.translation = translation;
        this.sentence = sentence;
        this.memorized = memorized
        this.folderId = folderId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    };
};