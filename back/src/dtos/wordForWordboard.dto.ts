import { Folder } from "../entity/Folder";
import { Word } from "../entity/word";

export class WordForWordboardDto {
    folder: {
        id: number,
        foldername: string,
        description: string
    };
    words: Word[] | null;

    constructor(folder: Folder, words: Word[] | null) {
        const { id, foldername, description } = folder;
        this.folder = { id, foldername, description };
        this.words = words
    }
}