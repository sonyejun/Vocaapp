import React from 'react';
import WordsCountItem from './WordsCountItem';

const WordsCount = React.memo(({ words }) => {
    const wordEntries = Object.entries(words);

    return (
        <>
            {wordEntries.map(([key, value], index) => (
                <WordsCountItem key={index} name={key} value={value} />
            ))}
        </>
    );

}, (prevProps, nextProps) => {
    return JSON.stringify(prevProps.words) === JSON.stringify(nextProps.words);
});


export default WordsCount;