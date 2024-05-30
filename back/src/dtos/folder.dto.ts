import { Folder } from "../entity/Folder";

export class FolderDto {
    id: number;
    foldername: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(folder: Folder) {
        const { id, foldername, description, createdAt, updatedAt } = folder;
        this.id = id;
        this.foldername = foldername;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}