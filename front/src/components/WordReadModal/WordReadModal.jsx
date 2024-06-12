import React, { useCallback, useState, useEffect } from 'react';
import { WordReadModalBox, ToggleSwitchBox } from './WordReadModal.style';
import SoundIcon from '../../assets/images/sound.png'
import { putData } from '../../services/api';

const WordReadModal = React.memo(({ setWordReadModalOpen, wordBoardData, setWordBoardData, readId }) => {
    const selectWordData = wordBoardData.words.filter((word) => {
        return word.id === Number(readId);
    });
    const [selectedWord, setSelectedWord] = useState(selectWordData[0]);

    const closeBtnClick = useCallback(() => {
        setWordReadModalOpen(false);
    }, []);

    const memorizedChange = useCallback(async (e) => {
        setSelectedWord({
            ...selectedWord,
            memorized: e.target.checked
        });
    }, [selectedWord]);

    useEffect(() => {
        const updateWordData = async () => {
            try {
                const jwtToken = localStorage.getItem('jwtToken');
                const submitData = { ...selectedWord };
                // console.log(submitData);
                const response = await putData(`/word/${readId}`, submitData, jwtToken);
                console.log(response);
                const updatedWordData = wordBoardData.words.map(word => {
                    if (word.id == readId) {
                        return {
                            ...selectedWord
                        };
                    } else {
                        return word;
                    }
                });

                setWordBoardData(prevWordBoardData => ({
                    ...prevWordBoardData,
                    words: updatedWordData
                }));

            } catch (err) {
                console.error('Create or Update word failed:', err);
            }
        };

        updateWordData();
    }, [selectedWord, readId]);

    return (
        <WordReadModalBox $SoundIcon={SoundIcon}>
            <div className="modalInnerBox">
                <div className="modalHeader">
                    <button className='closeBtn' onClick={closeBtnClick}>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div className="modalBody">
                    <div className="wordBox">
                        <div className="word">{selectedWord.word}</div>
                        <button type="button" className="soundBtn"></button>
                    </div>
                    <div className="translationBox">
                        <div className="textLabel">Meaning</div>
                        <div className="text">{selectedWord.translation}</div>
                    </div>
                    <div className="sentenceBox">
                        <div className="textLabel">Example sentence</div>
                        <div className="text">{selectedWord.sentence}</div>
                    </div>
                    <div className="memorizedBox">
                        <div className="textLabel">Memorized Status</div>
                        <ToggleSwitchBox className="toggleSwitch">
                            <input type="checkbox" id="toggle" className="toggleInput" name="memorized" defaultChecked={selectedWord.memorized} onChange={memorizedChange} />
                            <label htmlFor="toggle" className="toggleLabel"></label>
                        </ToggleSwitchBox>
                    </div>
                </div>
            </div>
        </WordReadModalBox >
    )
});

export default WordReadModal;