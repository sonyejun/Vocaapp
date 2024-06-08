import { Request, Response } from "express";
import * as wordService from '../services/word.service';
import { Word } from "../entity/word";
import { User } from "../entity/User";


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

        const words = await wordService.findWordInFolder(Number(folderId), user);

        if(!words) return res.status(404).send("Word not found");

        res.status(200).send(words);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};

const getWordsInUser = async (req:Request, res:Response) => {
    try {
        const user = req.user as User;
        const words = await wordService.findWordInUser(user);

        if(!words) return res.status(404).send("Word not found");

        res.status(200).send(words);

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