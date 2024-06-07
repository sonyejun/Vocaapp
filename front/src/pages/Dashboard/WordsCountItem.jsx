import React from 'react';

import { WordsCountBox } from './Dashboard.styles';

import totalIcon from '../../assets/images/dashboard/total.png';
import memorizedIcon from '../../assets/images/dashboard/memorized.png';
import unmemorizedIcon from '../../assets/images/dashboard/unmemorized.png';

const iconMap = {
    total: totalIcon,
    memorized: memorizedIcon,
    unmemorized: unmemorizedIcon
};

const titleMap = {
    total: "Total Words",
    memorized: "Memorized Words",
    unmemorized: "Unmemorized Words"
};

const WordsCountItem = React.memo(({ name, value }) => {
    return (
        <WordsCountBox className="gridItems">
            <img src={iconMap[name]} alt="totalIcon" />
            <div className='textBox'>
                <span className='name'>{titleMap[name]}</span>
                <span className='value'>{value}</span>
            </div>
        </WordsCountBox>
    );

});


export default WordsCountItem;