import { Folder } from "../entity/Folder";
import { WordDto } from "./word.dto";

export class AllWordForWordboardDto {
    folders: {
        id: number,
        foldername: string,
        description: string
    }[];
    words: WordDto[] | null;

    constructor(folders: Folder[], words: WordDto[] | null) {
        this.folders = folders.map(folder => ({ id: folder.id, foldername: folder.foldername, description: folder.description }));
        this.words = words
    }
}