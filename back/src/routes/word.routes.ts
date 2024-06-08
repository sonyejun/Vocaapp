import express from 'express';
import wordCtrl from '../controllers/word.ctrl';
const router = express.Router();

router.post('/:folderId', wordCtrl.createWord);
router.get('/list', wordCtrl.getWordsInUser);
router.get('/list/:folderId', wordCtrl.getWordsInFolder);
router.get('/:wordId', wordCtrl.getWord);
router.put('/:wordId', wordCtrl.editWord);
router.delete('/:wordId', wordCtrl.removeWord);

export default router;