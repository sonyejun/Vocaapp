import { AppDataSource } from "../data-source";
import { FolderForDashboardDto } from "../dtos/folderForDashboard.dto";
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
    const folders: Folder[] = await AppDataSource.getRepository(Folder)
        .createQueryBuilder('folder')
        .leftJoinAndSelect('folder.words', 'word')
        .where('folder.user = :userId', { userId: user.id })
        .getMany();

    if (!folders.length) return null;

    return folders;
};

export const findAllFoldersWordsForDashboard = async (user: User): Promise<FolderForDashboardDto[] | null> => {
    const folderRepository = await AppDataSource.getRepository(Folder)

    const folders = await folderRepository
        .createQueryBuilder("folder")
        .leftJoinAndSelect("folder.words", "word")
        .select("folder.id", "folderId")
        .addSelect("folder.foldername", "foldername")
        .addSelect("folder.createdAt", "createdAt")
        .addSelect("COUNT(word.id)", "wordCount")
        .where("folder.userId = :userId", { userId: user.id })
        .groupBy("folder.id")
        .orderBy("folder.createdAt", "DESC")
        .getRawMany();

    if(!folders) return null;

    return folders;
}

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