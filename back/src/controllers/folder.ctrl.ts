import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Folder } from "../entity/Folder";
import { User } from "../entity/User";

const createFolder = async(req: Request, res: Response) => {
    try {
        const { foldername, description }:Folder = req.body;

        const user = req.user

        const folder = AppDataSource.getRepository(Folder).create({
            foldername,
            description,
            user
        });

        const result: Folder = await AppDataSource.getRepository(Folder).save(folder);
        const { user: _, ...folderWithoutUser } = result;

        res.status(201).send(folderWithoutUser);

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};

const getfolders = async(req: Request, res:Response) => {
    try {
        const userid = (req.user as User).id;
        const folders:Folder[] = await AppDataSource.getRepository(Folder).find({
            where: { user: { id: userid } }
        });
        console.log(folders);
        res.status(200).send(folders);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};

const getfolderLength = async(req: Request, res:Response) => {
    try {
        const userid = (req.user as User).id;
        const folders:Folder[] = await AppDataSource.getRepository(Folder).find({
            where: { user: { id: userid } }
        });
        console.log(folders);
        res.status(200).send(folders);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};

export default {
    createFolder,
    getfolders
}