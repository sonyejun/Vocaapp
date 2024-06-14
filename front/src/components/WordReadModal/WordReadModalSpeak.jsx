import React, { useCallback } from 'react';
import { cancelSpeech, speak } from '../../services/speakService';

const WordReadModalSpeak = React.memo(({ isPaused, selectedWord }) => {
    const { word, sentence } = selectedWord;

    const oneWordSpeakStart = useCallback(async () => {
        await cancelSpeech();

        if (!isPaused) {
            await speak(word, sentence);
        }
    }, [isPaused]);

    return (
        <button type="button" className="soundBtn" onClick={oneWordSpeakStart}></button>
    );

}, (prevProps, nextProps) => {
    return JSON.stringify(prevProps.isPaused) === JSON.stringify(nextProps.isPaused);
});

export default WordReadModalSpeak;
