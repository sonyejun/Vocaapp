import React, { useState, useCallback, useEffect } from 'react';
import { FolderCUModalBox } from './FolderCUModal.style';
import FolderCUModalForm from './FolderCUModalForm';
import { postData, putData } from '../../services/api';

const FolderCUModal = React.memo(({setFolderModalOpen, folderData, setFolderData, editId}) => {

    const [ folderName, setFolderName ] = useState('');
    const [ folderDescription, setFolderDescription] = useState('');

    const nameChange = useCallback((e) => {
        setFolderName(e.target.value);
    }, [setFolderName]);

    const descriptionChange = useCallback((e) => {
        setFolderDescription(e.target.value);
    }, [setFolderDescription]);

    useEffect(() => {
        console.log(editId)
        if ( editId ) {
            const selectedFolder = folderData.find(folder => folder.folderId == editId);
            setFolderName(selectedFolder.foldername);
            setFolderDescription(selectedFolder.description);
        }
    }, [editId]);
    

    const closeBtnClick = () => {
        setFolderModalOpen(false);
    };

    const folderSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {
            const formData = { foldername: folderName, description: folderDescription };
            const jwtToken = localStorage.getItem('jwtToken');
            
            if ( !editId ) { //create
                const response = await postData('/folder', formData, jwtToken);
                
                const newFolder = {
                    folderId: response.id,
                    foldername: response.foldername,
                    description: response.description,
                    createdAt: response.createdAt,
                    memorizedCount: 0,
                    totalWordCount: 0
                }
                setFolderData([newFolder, ...folderData]);

            } else { //update
                const response = await putData(`/folder/${editId}`, formData, jwtToken);
                const updatedFolderData = folderData.map(folder => {
                    if (folder.folderId == editId) { 
                        return {
                            ...folder,
                            foldername: response.foldername,
                            description: response.description
                        };
                    } else {
                        return folder;
                    }
                });

                setFolderData(updatedFolderData);
                console.log(response);
            }

            setFolderName('');
            setFolderDescription('');
            setFolderModalOpen(false);

        } catch (err) {
            console.error('Create or Update folder failed:', err);
        }
    }, [editId, folderName, folderDescription]);

    return (
        <FolderCUModalBox>
            <div className="modalInnerBox">
                <div className="modalHeader">
                    <button className='closeBtn' onClick={closeBtnClick}>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div className="modalBody">
                    <FolderCUModalForm
                        folderSubmit={folderSubmit}
                        nameChange={nameChange}
                        descriptionChange={descriptionChange}
                        folderName={folderName}
                        folderDescription={folderDescription}
                        editId={editId}
                    />
                </div>
            </div>
        </FolderCUModalBox>
    );
});

export default FolderCUModal;