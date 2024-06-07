export class FolderForFolderboardDto {
    folderId: number;

    foldername: string;

    description: string;

    createdAt: Date;
    
    totalWordCount: number;

    memorizedCount: number;

    constructor(
        folderId: number,
        foldername: string,
        description: string,
        createdAt: Date,
        totalWordCount: number,
        memorizedCount: number,
    ) {
        this.folderId = folderId;
        this.foldername = foldername;
        this.description = description;
        this.createdAt = createdAt;
        this.totalWordCount = totalWordCount;
        this.memorizedCount = memorizedCount;
    }
};