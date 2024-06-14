import React, { useCallback, useState } from 'react';
import { ListenModalBox } from './ListenModal.style';

const ListenModal = React.memo(({wordBoardData, setListenModalOpen, setListenSpeakModalOpen, setListenData, setListenType, wordIndex }) => {
    const sortedWords = [...wordBoardData.words].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    const closeBtnClick = useCallback(() => {
        setListenModalOpen(false);
    }, [setListenModalOpen]);

    const allListenBtn = useCallback(() => {
        setListenType('all');
        setListenData(sortedWords);
        setListenSpeakModalOpen(true);
        setListenModalOpen(false);
    }, [wordBoardData, setListenModalOpen]);

    const memorizedListenBtn = useCallback(() => {
        const memorizedWords = sortedWords.filter( (word) => word.memorized);
        setListenData(memorizedWords);

        setListenType('memorized');
        setListenSpeakModalOpen(true);
        setListenModalOpen(false);
    }, [setListenModalOpen]);

    const unmemorizedListenBtn = useCallback(() => {
        const unmemorizedWords = sortedWords.filter( (word) => !word.memorized);
        setListenData(unmemorizedWords);

        setListenType('unmemorized');
        setListenSpeakModalOpen(true);
        setListenModalOpen(false);
    }, [setListenModalOpen]);

    return (
        <>
            <ListenModalBox>
                <div className="modalInnerBox">
                    <div className="modalHeader">
                        <button type="button" className='closeBtn' onClick={closeBtnClick}>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                    <div className="modalBody">
                        <button type="button" className='listenBtn all' onClick={allListenBtn}>Listen All Words</button>
                        <button type="button" className='listenBtn memorized' onClick={memorizedListenBtn}>Listen memorized words</button>
                        <button type="button" className='listenBtn unmemorized' onClick={unmemorizedListenBtn}>Listen unmemorized words</button>
                    </div>
                </div>
            </ListenModalBox>
        </>
    )
});

export default ListenModal;