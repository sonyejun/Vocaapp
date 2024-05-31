import { FolderForDashboardDto } from "./folderForDashboard.dto";

export class DashboardDto {
    totalWords: number;

    memorizedWords: number;

    unmemorizedWords: number;

    yesterdayWords: number;

    totalFolders: number;

    recentFolders: FolderForDashboardDto[] | null;

    constructor(
        totalWords: number,
        memorizedWords: number,
        unmemorizedWords: number,
        yesterdayWords: number,
        totalFolders: number,
        recentFolders: FolderForDashboardDto[] | null
    ) {
        this.totalWords = totalWords;
        this.memorizedWords = memorizedWords;
        this.unmemorizedWords = unmemorizedWords;
        this.yesterdayWords = yesterdayWords;
        this.totalFolders = totalFolders;
        this.recentFolders = recentFolders;
    }
};