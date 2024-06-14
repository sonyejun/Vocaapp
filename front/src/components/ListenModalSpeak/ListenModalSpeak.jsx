import React, { useCallback, useEffect, useState, useRef } from 'react';
import { ListenModalBoxSpeakBox } from './ListenModalSpeak.style';
import { speak, cancelSpeech } from '../../services/speakService';

import SoundIcon from '../../assets/images/sound.png';
import SoundStopIcon from '../../assets/images/soundStop.png';

const ListenModalSpeak = React.memo(({ setListenModalOpen, setListenSpeakModalOpen, listenData, listenType, wordIndex, setWordIndex }) => {
    const [modalTitle, setModalTitle] = useState('');
    const [btnStatus, setBtnStatus] = useState(true);
    const isPausedRef = useRef(true);
    const timeoutRef = useRef(null);
    const [forceUpdate, setForceUpdate] = useState(false);

    useEffect(() => {
        // If there's no data to listen, alert the user and close the speak modal
        if (!listenData.length) {
            alert('There is no data for listening');
            setListenModalOpen(true);
            setListenSpeakModalOpen(false);
        };

        // Set the modal title based on the listenType prop
        switch (listenType) {
            case "all":
                setModalTitle("Listen All Words");
                break;
            case "memorized":
                setModalTitle("Listen memorized words");
                break;
            case "unmemorized":
                setModalTitle("Listen unmemorized words");
                break;
            default:
                setModalTitle("Listen Words");
        }
    }, [listenData, listenType, setListenModalOpen, setListenSpeakModalOpen]);

    // Function to handle the close button click
    const closeBtnClick = useCallback(async () => {
        await cancelSpeech();
        setListenSpeakModalOpen(false);
        setWordIndex(0);
    }, [setListenSpeakModalOpen]);

    // Function to start speaking the current word and sentence
    const wordSpeakStart = useCallback(async () => {
        await cancelSpeech();
        if (!isPausedRef.current) {
            const { word, sentence } = listenData[wordIndex];
            await speak(word, sentence);

            // Set a timeout to move to the next word after 4 seconds
            timeoutRef.current = setTimeout(() => {
                setWordIndex(prevIndex => {
                    if (listenData.length === 1) {
                        setForceUpdate(prev => prev + 1);
                    };
                    const newIndex = (listenData.length === prevIndex + 1) ? 0 : prevIndex + 1;
                    return newIndex;
                });
            }, 2500);
        };

    }, [wordIndex, forceUpdate, listenData, setWordIndex]);

    // Function to handle the 'on' button click
    const speakOn = useCallback(async () => {
        setBtnStatus(false); // Set button status to 'off'
        isPausedRef.current = false; // Unpause the speech
        await wordSpeakStart();// Start speaking
    }, [wordSpeakStart]);

    // Function to handle the 'off' button click
    const speakOff = useCallback(async () => {
        isPausedRef.current = true; // Pause the speech
        await cancelSpeech(); // Cancel ongoing speech
        setBtnStatus(true);// Set button status to 'on'

        // Clear the timeout if it exists
        if (timeoutRef) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, [timeoutRef]);

    useEffect(() => {
        if (!isPausedRef.current) {
            wordSpeakStart();
        }

        return () => {
            cancelSpeech();
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current); // 컴포넌트가 언마운트될 때 타임아웃 취소
            }
        };
    }, [wordIndex, wordSpeakStart]);

    useEffect(() => {
        if (listenData.length === 1) {
            setWordIndex(0); // If the length is 1, force the index to 0 to trigger re-rendering
        }
    }, [setWordIndex]);

    return (
        <ListenModalBoxSpeakBox $SoundIcon={SoundIcon} $SoundStopIcon={SoundStopIcon}>
            <div className="modalInnerBox">
                <div className="modalHeader">
                    <button type="button" className='closeBtn' onClick={closeBtnClick}>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div className="modalBody">
                    <div className="modalTitle">{modalTitle}</div>

                    {btnStatus ?
                        <button type="button" className='on' onClick={speakOn}></button> :
                        <button type="button" className='off' onClick={speakOff}></button>
                    }

                    <div className="textBox">
                        <div className="wordBox">
                            <div className="word">{listenData[wordIndex].word}</div>
                        </div>
                        <div className="translationBox">
                            <div className="textLabel">Meaning</div>
                            <div className="text">{listenData[wordIndex].translation}</div>
                        </div>
                        <div className="sentenceBox">
                            <div className="textLabel">Example sentence</div>
                            <div className="text">{listenData[wordIndex].sentence}</div>
                        </div>
                    </div>
                </div>
            </div>
        </ListenModalBoxSpeakBox>
    );
}, (prevProps, nextProps) => {
    return JSON.stringify(prevProps.wordIndex) === JSON.stringify(nextProps.wordIndex);
});

export default ListenModalSpeak;
