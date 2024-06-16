import React, { useState, useCallback, useEffect, useRef } from 'react';

import { postData, putData, transitionAPI } from '../../services/api';
import { WordCUModalBox } from './WordCUModal.style';
import WordCUModalForm from './WordCUModal.Form';

const defaultFormData = { word: '', translation: '', sentence: '' };

const WordCUModal = React.memo(({wordCUModalOpen, setWordCUModalOpen, folderSelectBox, wordBoardData, setWordBoardData, editId, setEditId}) => {
    const [formData, setFormData] = useState({...defaultFormData});
    const [selectedFolder, setSelectedFolder]  = useState(folderSelectBox[0].id);
    const wordInputRef = useRef(null);

    useEffect(() => {
        if ( editId ) {
            const selectedWord = wordBoardData.words.find(word => word.id == editId);
            const { word, translation, sentence} = selectedWord
            setFormData({word, translation, sentence});
            setSelectedFolder(selectedWord.folderId);
        }
    }, [editId]);

    

    const formChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    },[]);

    const folderSelectChange = useCallback((e) => {
        const { value } = e.target;
        setSelectedFolder(value);
    },[])

    const wordFocusOut = useCallback( async(e) => {
        if (wordCUModalOpen) {
            try {
                const translation = await transitionAPI(formData.word);
                setFormData(prevFormData => ({ ...prevFormData, translation }));
            } catch (err) {
                console.log(err);
                alert("Automatic translation did not work");
            };
        }
    },[wordCUModalOpen, formData.word]);

    const closeBtnClick = useCallback(() => {
        setWordCUModalOpen(false);
    },[]);

    const onMouseDown = useCallback(() => {
        setWordCUModalOpen(false);
    },[]);

    const wordSubmit = useCallback(async (e) => {
        try {
            const jwtToken = localStorage.getItem('jwtToken');
            const submitData = {...formData};
            if ( !editId ) { //create
                const folderId = selectedFolder
                const response = await postData(`/word/${folderId}`, submitData, jwtToken);
                
                const { folder, ...rest } = response;

                setWordBoardData(prevWordBoardData => ({
                    ...prevWordBoardData, ...rest,
                    words: prevWordBoardData.words ? [...prevWordBoardData.words, rest] : [rest]
                }));

            } else { //update
                const response = await putData(`/word/${editId}`, submitData, jwtToken);
                const updatedWordData = wordBoardData.words.map(word => {
                    if (word.id == editId) {
                        return {
                            ...response
                        };
                    } else {
                        return word;
                    }
                });

                setWordBoardData(prevWordBoardData => ({
                    ...prevWordBoardData,
                    words: updatedWordData
                }));
            };
            
            setWordCUModalOpen(false);
            setFormData({...defaultFormData});
        } catch (err) {
            console.error('Create or Update word failed:', err);
        }
    }, [selectedFolder, formData, editId]);

    return (
        <WordCUModalBox>
            <div className="modalInnerBox">
                <div className="modalHeader">
                    <button className='closeBtn' onClick={closeBtnClick} onMouseDown={onMouseDown}>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div className="modalBody">
                    <WordCUModalForm
                        formData={formData}
                        formChange={formChange}
                        folderSelectChange={folderSelectChange}
                        folderSelectBox={folderSelectBox}
                        selectedFolder={selectedFolder}
                        wordFocusOut={wordFocusOut}
                        wordSubmit={wordSubmit}
                        editId={editId}
                        onMouseDown={onMouseDown}
                        wordInputRef={wordInputRef}
                    />
                </div>
            </div>
        </WordCUModalBox>
    );
}, (prevProps, nextProps) => {
    return JSON.stringify(prevProps.editId) === JSON.stringify(nextProps.editId);
})


export default WordCUModal;