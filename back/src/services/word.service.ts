import { AppDataSource } from "../data-source";
import { Folder } from "../entity/Folder";
import { User } from "../entity/User";
import { Word } from "../entity/word";
import * as folderService from '../services/folder.service';

export const addWordToFolder = async (folderId: number, word: Word, user: User): Promise<Word | null> => {

    const folder = await folderService.findFolder(folderId, user);

    if(!folder) return null;

    const wordRepository = AppDataSource.getRepository(Word)

    const createWord = wordRepository.create({
        ...word,
        folder
    });
    
    return await wordRepository.save(createWord);
};

export const findWordInFolder = async (folderId: number, user: User): Promise<Word[] | null> => {
    const wordRepository = AppDataSource.getRepository(Word);

    const words = await wordRepository
        .createQueryBuilder("word")
        .innerJoin("word.folder", "folder")
        .where("folder.id = :folderId", { folderId })
        .andWhere("folder.userId = :userId", { userId: user.id })
        .getMany();

    if (!words.length) return null;

    return words
};

export const updateWord = async (wordId: number, user: User, updateData:Word): Promise<Word | null> => {
    const wordRepository = AppDataSource.getRepository(Word);
    const userId = user.id;

    const word = await wordRepository
    .createQueryBuilder("word")
    .innerJoin("word.folder", "folder")
    .where("word.id = :wordId", { wordId })
    .andWhere("folder.userId = :userId", { userId })
    .getOne();

    if (!word) return null;
    
    // 업데이트할 정보 설정
    word.word = updateData.word ?? word.word;
    word.translation = updateData.translation ?? word.translation;
    word.sentence = updateData.sentence ?? word.sentence;
    word.memorized = updateData.memorized ?? word.memorized;

    // 업데이트 실행
    return await wordRepository.save(word);
};

export const findWord = async (wordId: number, user: User): Promise<Word | null> => {
    const wordRepository = AppDataSource.getRepository(Word);

    const word = await wordRepository
    .createQueryBuilder("word")
    .innerJoin("word.folder", "folder")
    .where("word.id = :wordId", { wordId })
    .andWhere("folder.userId = :userId", { userId: user.id })
    .getOne();

    if (!word) return null;

    return word;
}

export const deleteWord = async (wordId: number, user: User): Promise<boolean> => {
    const wordRepository = AppDataSource.getRepository(Word);

    const word = await wordRepository
    .createQueryBuilder("word")
    .innerJoin("word.folder", "folder")
    .where("word.id = :wordId", { wordId })
    .andWhere("folder.userId = :userId", { userId: user.id })
    .getOne();

    if (!word) return false;

    await wordRepository.remove(word);
    return true;
};