import { FolderForDashboardDto } from "./folderForDashboard.dto";

export class DashboardDto {
    words: {
        total: number;
        memorized: number;
        unmemorized: number;
    };

    memorizedWords: number;

    unmemorizedWords: number;

    yesterdayWords: number;

    totalFolders: number;

    recentFolders: FolderForDashboardDto[] | null;

    constructor(
        words: {
            total: number;
            memorized: number;
            unmemorized: number;
        },
        yesterdayWords: number,
        totalFolders: number,
        recentFolders: FolderForDashboardDto[] | null
    ) {
        this.words = words;
        this.yesterdayWords = yesterdayWords;
        this.totalFolders = totalFolders;
        this.recentFolders = recentFolders;
    }
};