import React from 'react';
import { WordModalInputBox, WordModalSelectOuterBox, WordSuccessBtn } from './WordCUModal.style';

const WordCUModalForm = React.memo(({formData, formChange, folderSelectChange, folderSelectBox, selectedFolder, wordFocusOut, wordSubmit, editId, onMouseDown, wordInputRef}) => {
    return (
        <form>
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
                <input type="text" id="word" name="word" placeholder='Entert English word' required onChange={formChange} onBlur={wordFocusOut} value={formData.word} ref={wordInputRef} />
            </WordModalInputBox>

            <WordModalInputBox>
                <label htmlFor="translation">Korean meaning</label>
                <input type="text" id="foldername" name="translation" placeholder='Enter Korean meaning' required onChange={formChange} value={formData.translation} />
            </WordModalInputBox>

            <WordModalInputBox>
                <label htmlFor="sentence">Sentence</label>
                <input type="text" id="sentence" name="sentence" placeholder='Enter Sentence' required onChange={formChange} value={formData.sentence} />
            </WordModalInputBox>

            <WordSuccessBtn type="submit" onMouseDown={ async (e) => {
                await wordSubmit();
                onMouseDown()
            }}>{editId ? 'Update Word' :'Create Word'}</WordSuccessBtn>
        </form>
    )
})

export default WordCUModalForm;