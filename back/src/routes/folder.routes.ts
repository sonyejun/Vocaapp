import express from "express";

import folderCtrl from "../controllers/folder.ctrl";

const router = express.Router();

router.post('/', folderCtrl.createFolder);
router.get('/list', folderCtrl.getfolders);
export default router