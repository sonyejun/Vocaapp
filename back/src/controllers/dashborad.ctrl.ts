import { Request, Response, NextFunction } from "express";

import { User } from "../entity/User";

import * as wordService from '../services/word.service';
import * as folderService from '../services/folder.service';

import { DashboardDto } from "../dtos/dashboard.dto";
import { FolderForDashboardDto } from "../dtos/folderForDashboard.dto";

const getDashboard = async (req: Request, res: Response) => {
    try {
        const user = req.user as User;
    
        const allWords = await wordService.findWordInUser(user);

        let totalWords: number;
        let memorizedWords: number;
        let unmemorizedWords: number;
        let yesterdayWords: number;

        if ( !allWords ) {
            totalWords = 0;
            memorizedWords = 0;
            unmemorizedWords = 0;
            yesterdayWords = 0;
        
        } else {
            totalWords = allWords.length;
            memorizedWords = allWords.filter(word => word.memorized).length;
            unmemorizedWords = allWords.filter(word => !word.memorized).length;

            const yesterday: Date = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            yesterdayWords = allWords.filter( word => {
                const createAt: Date = new Date(word.createdAt);
                return createAt.toDateString() === yesterday.toDateString();
            }).length;
        };
        
        const allFolders = await folderService.findAllFoldersWordsForDashboard(user);
        
        let totalFolders: number;
        
        let recentFolders: FolderForDashboardDto[] | null;

        if ( !allFolders ) {
            totalFolders = 0;
            recentFolders = null;
        } else {
            totalFolders = allFolders.length;

            const sortedFolders = allFolders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            recentFolders = sortedFolders.slice(0, 3);
        };
        

        const dashboardData = new DashboardDto(
            totalWords,
            memorizedWords,
            unmemorizedWords,
            yesterdayWords, 
            totalFolders,
            recentFolders
        );

        res.status(200).send(dashboardData);

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};

export default {
    getDashboard
}