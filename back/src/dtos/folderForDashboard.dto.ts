export class FolderForDashboardDto {
    folderId: number;
    foldername: string;
    wordCount: number;
    createdAt: Date;

    constructor(
        folderId: number,
        foldername: string,
        wordCount: number,
        createdAt: Date
    ) {
        this.folderId = folderId;
        this.foldername = foldername;
        this.wordCount = wordCount;
        this.createdAt = createdAt;
    }
};