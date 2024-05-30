import { AppDataSource } from "../data-source";
import { Folder } from "../entity/Folder";
import { User } from "../entity/User";

// Create Folder
export const addFolder = async (foldername: string, description: string, user: User): Promise<Folder> => {
    const folder = AppDataSource.getRepository(Folder).create({
        foldername,
        description,
        user
    });
    return await AppDataSource.getRepository(Folder).save(folder);
};

export const findFolder = async(folderId: number, user: User): Promise<Folder | null> => {
    const folder = AppDataSource.getRepository(Folder).findOne({
        where: {id: folderId, user: {id: user.id}}
    });

    if(!folder) return null;

    return folder;
}

export const findAllFolders = async(user: User): Promise<Folder[] | null> => {
    const folders = await AppDataSource.getRepository(Folder).find({
        where: { user: { id: user.id } }
    });

    if (!folders.length) return null;

    return folders;
};

export const updateFolder = async(folderId: number, foldername: string, description: string, user: User): Promise<Folder | null> => {
    const folderRepository = AppDataSource.getRepository(Folder);

    const folder = await folderRepository.findOne({
        where: { id: folderId, user: { id: user.id } }
    });


    if(!folder) return null;

    folder.foldername = foldername;
    folder.description = description;

    return await folderRepository.save(folder);
};

export const deleteFolder = async(folderId: number, user: User): Promise<boolean> => {
    const folderRepository = AppDataSource.getRepository(Folder);

    const folder = await folderRepository.findOne({
        where: {
            id: folderId,
            user: { id: user.id }
        }
    });

    if(!folder) return false;

    await folderRepository.remove(folder);
    return true;
};