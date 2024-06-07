import React from 'react';
import { WordsLinkBox, WordsLinkBtn } from './Dashboard.styles';
import WordsLink from '../../assets/images/dashboard/wordsLink.png'


const DashboardListen = React.memo(() => {
    return (
        <WordsLinkBox $bg={WordsLink} className='gridItems'>
            <div className="textBox">
                <div className="text">Check out the registered words</div>
                <WordsLinkBtn to="/word">Check the Words</WordsLinkBtn>
            </div>
        </WordsLinkBox>
    );
});

export default DashboardListen;