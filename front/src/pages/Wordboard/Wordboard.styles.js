import styled from "styled-components";
import { buttonStyle } from "../../styles/Button";
import { getColor, getFontSize } from "../../utils/themeUtils";
import { selectStyle } from "../../styles/SelectBox";

export const WordBox = styled.div`
    .topBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .subText {
            font-size: 1.25rem;
            font-weight: 500;
            color: ${getColor('gray')};
        }
        .buttonBox {
            display: flex;

            select {
                ${selectStyle};
            };    

            button {
                ${buttonStyle};
                width: auto;
                font-size: ${getFontSize("lg")};
                margin-left: 16px;

                &.listenBtn {
                    background: ${getColor('secondary')};
                }
            }
        }
    }
`;

export const CardListBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    gap: 20px;
    overflow: auto;
    height: calc(100% - 64px);
    align-content: flex-start;
`;

export const CardListItem = styled.div`
    width: calc((100% - 40px) / 3);
    padding: 20px 26px;
    border-radius: 10px;
    border: 1px solid ${props => props.$memorized ? '#7ADD4B' : '#DD4B4B'};
    background: #fff;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    &:hover {
        box-shadow: 0 4px 10px rgba(0, 0, 0, .5);
    } 

    .cardHeader {
        display: flex;
        
        .wordTitle {
            font-size: 1.5rem;
            font-weight: bold;
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .buttonBox {
            display: flex;

            button {
                width: 34px;
                height: 34px;
                background: url(${props => props.$EditIon})no-repeat 0 0 / cover;
                transition: transform .4s ease;

                &:hover {
                    transform: scale(1.5);
                }

                & + button {
                    margin-left: 4px;
                    background: url(${props => props.$DeleteIcon})no-repeat 0 0 / cover;
                }
            }
        }
    }

    .cardBody {
        div {
            margin-top: 16px;
            overflow: hidden;
            text-wrap: nowrap;
            text-overflow: ellipsis;

            &.wordTranslation {
                font-weight: 500;
                color: ${getColor('gray')};
                font-size: 1.125rem;
            }

            &.wordSentence {
                color: ${getColor('gray_c')};
            }
        }

    }
`

