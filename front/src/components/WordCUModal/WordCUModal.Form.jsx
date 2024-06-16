import React from 'react';
import { WordModalInputBox, WordModalSelectOuterBox, WordSuccessBtn } from './WordCUModal.style';

const WordCUModalForm = React.memo(({formData, formChange, folderSelectChange, folderSelectBox, selectedFolder, wordFocusOut, wordSubmit, editId, onMouseDown, wordInputRef}) => {
    return (
        <form onSubmit={async (e) => {
            e.preventDefault();
            await wordSubmit();
        }}>
            <WordModalSelectOuterBox>
                <div className="selectBoxLabel">Folder to Register</div>
                <select onChange={folderSelectChange} defaultValue={selectedFolder} id="selectFolder" required disabled={editId ? true : false}>
                    {
                        folderSelectBox.map((folder) => (
                            <option key={folder.id} value={folder.id}>{folder.foldername}</option>
                        ))
                    }
                </select>
            </WordModalSelectOuterBox>
            <WordModalInputBox>
                <label htmlFor="word">English Word</label>
                <input type="text" id="word" name="word" placeholder='Entert the English word' required onChange={formChange} onBlur={wordFocusOut} value={formData.word} ref={wordInputRef} />
            </WordModalInputBox>

            <WordModalInputBox>
                <label htmlFor="translation">meaning</label>
                <input type="text" id="foldername" name="translation" placeholder='Enter the meaning' required onChange={formChange} value={formData.translation} />
            </WordModalInputBox>

            <WordModalInputBox>
                <label htmlFor="sentence">Sentence</label>
                <input type="text" id="sentence" name="sentence" placeholder='Enter the Sentence' required onChange={formChange} value={formData.sentence} />
            </WordModalInputBox>

            <WordSuccessBtn type="submit" onMouseDown={ async (e) => {
                const { word, translation, sentence } = submitData;
                if(!word || !translation || !sentence ) return false;
                if (e.detail > 1) return;
                await wordSubmit();
                onMouseDown()
            }}>{editId ? 'Update Word' :'Create Word'}</WordSuccessBtn>
        </form>
    )
})

export default WordCUModalForm;