import express from "express";

import folderCtrl from "../controllers/folder.ctrl";

const router = express.Router();

router.post('/', folderCtrl.createFolder);
router.get('/list', folderCtrl.getFolders);
router.get('/:folderId', folderCtrl.getFolder);
router.put('/:folderId', folderCtrl.edtiFolder);
router.delete('/:folderId', folderCtrl.removeFolder);

export default router