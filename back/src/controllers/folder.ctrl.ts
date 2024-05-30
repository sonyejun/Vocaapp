import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import * as folderService from '../services/folder.service';
import { FolderDto } from "../dtos/folder.dto";

const createFolder = async(req: Request, res: Response) => {
    try {
        const { foldername, description } = req.body;
        const user = req.user as User

        const folder = await folderService.addFolder(foldername, description, user);
        const folderDto = new FolderDto(folder);

        res.status(201).send(folderDto);

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};

const getFolder = async(req: Request, res:Response) => {
    try {
        const user = req.user as User
        const { folderId } = req.params;

        const folder = await folderService.findFolder(Number(folderId), user);

        if (!folder) return res.status(404).send("Folder not found");

        const foldersDto = new FolderDto(folder);

        res.status(200).send(foldersDto);

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};

const getFolders = async(req: Request, res:Response) => {
    try {
        const user = req.user as User

        const folders = await folderService.findAllFolders(user);

        if (!folders) return res.status(404).send("Folder not found");

        const foldersDto:FolderDto[] = folders.map(folder => new FolderDto(folder));

        res.status(200).send(foldersDto);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};

const edtiFolder = async(req: Request, res: Response) => {
    try {
        const { foldername, description } = req.body;
        const { folderId } = req.params;
        const user = req.user as User

        const updatedFolder = await folderService.updateFolder(Number(folderId), foldername, description, user);

        if (!updatedFolder) return res.status(404).send("Folder not found");
        
        const folderDto = new FolderDto(updatedFolder);

        res.status(200).send(folderDto);

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};

const removeFolder = async(req:Request, res: Response) => {
    try {
    
        const { folderId } = req.params;
        console.log(folderId)
        const user = req.user as User;

        const deleteFolder = await folderService.deleteFolder(Number(folderId), user);

        if (!deleteFolder) return res.status(404).send("Folder not found");

        res.status(204).send();
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};

export default {
    createFolder,
    getFolder,
    getFolders,
    edtiFolder,
    removeFolder
}