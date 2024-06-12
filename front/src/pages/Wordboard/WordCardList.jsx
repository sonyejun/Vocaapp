import React,{useCallback} from 'react';

import { CardListBox, CardListItem } from './Wordboard.styles';

import EditIon from '../../assets/images/edit.png';
import DeleteIcon from '../../assets/images/delete.png';

const WordCardList = React.memo(({ sortedWordData, wordEdit, wordRemove, toggleReadModal }) => {
    return (
        <CardListBox>
            {
                sortedWordData.map((word, index) => (
                    <CardListItem key={word.id} $EditIon={EditIon} $DeleteIcon={DeleteIcon} $memorized={word.memorized} onClick={() => toggleReadModal(word.id)} >
                        <div className="cardHeader">
                            <div className="wordTitle">{word.word}</div>
                            <div className="buttonBox">
                                <button type="button" value={word.id} onClick={wordEdit}></button>
                                <button type="button" value={word.id} onClick={wordRemove} data-name={word.word}></button>
                            </div>
                        </div>
                        <div className="cardBody">
                            <div className="wordTranslation">{word.translation}</div>
                            <div className="wordSentence">{word.sentence}</div>
                        </div>
                    </CardListItem>
                ))
            }
        </CardListBox>
    )
}, (prevProps, nextProps) => {
    return JSON.stringify(prevProps.sortedWordData) === JSON.stringify(nextProps.sortedWordData);
});

export default WordCardList;