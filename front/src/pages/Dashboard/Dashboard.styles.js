import styled from 'styled-components';
import { getColor, getFontSize, getSpacing } from '../../utils/themeUtils';
import { Button, LinkButton } from '../../styles/Button';

export const DashboardBox = styled.div`
    height: calc(100% - (2.25rem + 20px));
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto 1fr auto;
    grid-gap: 2rem;
    margin-top: 20px;

    .gridItems {
        background-color: #fff;
        border-radius: 14px;
        
        &:nth-child(4) {
            grid-column: span 2;
        }
        &:nth-child(5) {
            grid-row: span 2;
        }

        &:nth-child(6) {
            margin-right: 70px;
        }
        
        &:nth-child(7) {
            margin-left: -70px;
        }
    }
`;

export const WordsCountBox = styled.div`
    display: flex;
    padding: 24px 38px;

    img {
        width: 90px;
        height: 90px;
    }

    .textBox{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        margin-left: ${getSpacing("lg")};
        
        span {
            display: block;

            &.name {
                color: ${getColor("gray")};
            }

            &.value {
                font-weight: bold;
                font-size: 4rem;
            }
        }
    }
`

export const RegisterWordBox = styled.div`
    position: relative;
    padding: 50px 68px; 
    
    .leftBox {
        display: flex;
        flex-direction: column;
        height: 100%;
        position: relative;
        z-index: 1;
        width: 360px;

        .leftBoxTitle {
            font-weight: 600;
            font-size: ${getFontSize("xl")};
        };
        .leftBoxText {
            margin-top: auto;
            color: ${getColor("gray")};
            margin-top: 1.125rem;
            line-height: 140%;
        };
    };

    .rightBox {
        width: 470px;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);

        img {
            width: 100%:
        }

        .rightBoxTextBox {
            position: absolute;
            text-align: center;
            right: 138px;
            top: 94px;
            color: #fff;

            .subTitle {
                line-height: 120%;
            }

            .value {
                font-weight: 600;
                font-size: 4rem;
                margin-top: 6px;
            }
        }
    }
`;

export const RegisterWordBtn = styled(LinkButton)`
    margin-top: auto;
    padding: 1.25rem 1.5rem;
    font-weight: 400;
    font-size: ${getFontSize("md")};
`;

export const WordsLinkBox = styled.div`
    min-height: 600px;
    background: url(${props => props.$bg}) no-repeat 0 0 / cover;
    
    .textBox{
        height: 100%;
        padding: 32px 60px;
        display: flex;
        flex-direction: column;

        .text {
            font-size: ${getFontSize("xl")};
            color: #fff;
            line-height: 130%;  
        }
    }
`;

export const WordsLinkBtn = styled(LinkButton)`
    margin-top: auto;
    padding: 1.25rem 1.5rem;
    font-weight: 400;
    font-size: ${getFontSize("md")};
`;

export const FolderCountBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 32px 30px;
    
    .topBox {
        width: 228px;
        position: relative;

        img {
            width: 100%;
        }
        .countBox{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -46%);
            text-wrap: nowrap;

            .countBoxTitle {
                font-size: ${getFontSize("md")};
            }

            .countBoxValue {
                color: ${getColor("secondary")};
                font-size: 4rem;
                background: #fff;
                text-align: center;
                font-weight: 600;
                border-radius: 8px;
                margin-top: 4px;
                padding: 8px;
            }
        }
    }
`;

export const FolderCounBtn = styled(LinkButton)`
    width: 228px;
    margin-top: auto;
    padding: 1.25rem 1.5rem;
    font-weight: 400;
    font-size: ${getFontSize("md")};
`;

export const RecentlyFolderBox = styled.div`
    padding: 32px;
    display: flex;
    flex-direction: column;

    .subTitle {
        font-size: ${getFontSize("md")};
        font-weight: 600;
    }

    ul {
        height: 100%;
        display: flex;
        flex-direction: column;
        li {
            display: flex;
            padding: 1rem;
            align-items: center;
            border-radius: 8px;
            margin-top: 20px;

            &:nth-child(2n + 1) {
                background: #D9ECF9;
            }
            &:nth-child(2n + 2) {
                background: #f7f7f7;
            }

            img {
                height: 1.125rem;
            }

            .folderInfoBox{
                margin-left: 10px;
                flex: 1;
                display: flex;
                justify-content: space-between;
            }
        }
    }
`;