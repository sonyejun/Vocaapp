import { Request, Response } from "express";

import * as wordService from '../services/word.service';
import * as folderService from '../services/folder.service';

import { Word } from "../entity/word";
import { User } from "../entity/User";
import { WordForWordboardDto } from "../dtos/wordForWordboard.dto";
import { AllWordForWordboardDto } from "../dtos/AllWordForWordboard.dto";
import { WordDto } from "../dtos/word.dto";

const createWord = async (req:Request, res: Response) => {
    try {
        const word: Word = req.body;
        const { folderId } = req.params;
        const user = req.user as User;
        const addedWord = await wordService.addWordToFolder(Number(folderId), word, user);

        if(!addedWord) return res.status(404).send("Not a valid folder");
        
        console.log(addedWord);
        res.status(201).send(addedWord);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};

const getWordsInFolder = async (req:Request, res:Response) => {
    try {
        const { folderId } = req.params;
        const user = req.user as User;

        const folder = await folderService.findFolder(Number(folderId), user);

        if (!folder) return res.status(404).send("Folder not found");
        
        const words = await wordService.findWordInFolder(Number(folderId), user);
        
        const wordForWordboardDto = new WordForWordboardDto(folder, words ? words : null);

        res.status(200).send(wordForWordboardDto);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};

const getWordsInUser = async (req:Request, res:Response) => {
    try {
        const user = req.user as User;

        const folders = await folderService.findAllFolders(user);

        if (!folders) return res.status(404).send("Folder not found");

        const words = await wordService.findWordInUser(user);
        console.log(words)

        const wordDtos = words ? words.map(word => new WordDto(word)) : null;

        console.log(wordDtos)

        const allWordForWordboardDto = new AllWordForWordboardDto(folders, wordDtos);

        res.status(200).send(allWordForWordboardDto);

    } catch (err){
        console.log(err);
        res.status(500).send(err.message);
    }
}

const getWord = async (req:Request, res:Response) => {
    try {
        const { wordId } = req.params;
        const user = req.user as User;

        const word = await wordService.findWord(Number(wordId), user);

        if(!word) return res.status(404).send("Word not found");

        res.status(200).send(word);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};


const editWord = async (req:Request, res: Response) => {
    try {
        const { wordId } = req.params;
        const user = req.user as User;
        const word: Word = req.body;

        const updatedWord = await wordService.updateWord(Number(wordId), user, word);
        
        if(!updatedWord) return res.status(404).send("Word not found");

        res.status(200).send(updatedWord);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};

const removeWord = async (req:Request, res: Response) => {
    try {
        const { wordId } = req.params;
        const user = req.user as User;

        const deletedWord = await wordService.deleteWord(Number(wordId), user);
        
        if(!deletedWord) return res.status(404).send("Word not found");

        res.status(204).send();
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};

export default {
    createWord,
    getWordsInFolder,
    getWord,
    editWord,
    removeWord,
    getWordsInUser
}