import React from 'react';
import { RegisterWordBox, RegisterWordBtn } from './Dashboard.styles';
import RegisterImg from '../../assets/images/dashboard/register.png';

const ResiterWord = React.memo(({yesterdayWords}) => {
    return (
        <RegisterWordBox className="gridItems">
            <div className='leftBox'>
                <div className="leftBoxTitle">Register Your Words</div>
                <div className="leftBoxText">Please check the number of words<br />added yesterday and <br />register today's words</div>
                <RegisterWordBtn to="/word">Register today’s word</RegisterWordBtn>
            </div>
            <div className="rightBox">
                <img src={ RegisterImg } alt="register img" />
                <div className="rightBoxTextBox">
                    <div className="subTitle">Words Registered<br />Yesterday</div>
                    <div className="value">{ yesterdayWords }</div>
                </div>
            </div>
        </RegisterWordBox>
    )
}, (prevProps, nextProps) => {
    return JSON.stringify(prevProps.yesterdayWords) === JSON.stringify(nextProps.yesterdayWords);
});

export default ResiterWord;