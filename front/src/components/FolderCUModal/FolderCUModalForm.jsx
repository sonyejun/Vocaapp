import React, { useState, useCallback } from 'react';
import { FolderModalInputBox, FolderModalTextareaBox, FolderSuccessBtn } from './FolderCUModal.style';

const FolderCUModalForm = React.memo(({nameChange, descriptionChange, folderName, folderDescription, folderSubmit}) => {
    return (
        <form onSubmit={folderSubmit}>
            <FolderModalInputBox>
                <label htmlFor="foldername">Folder Name</label>
                <input type="text" id="foldername" name="foldername" placeholder='Enter folder name' required onChange={nameChange} value={folderName} />
            </FolderModalInputBox>
            <FolderModalTextareaBox>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" placeholder='Enter folder name' value={folderDescription} onChange={descriptionChange} required></textarea>
            </FolderModalTextareaBox>

            <FolderSuccessBtn type="submit">Create</FolderSuccessBtn>
        </form>
    )
});

export default FolderCUModalForm;