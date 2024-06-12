import styled from "styled-components";
import { Button } from "../../styles/Button";
import { getFontSize } from "../../utils/themeUtils";


export const FolderBox = styled.div`
    .buttonBox {
        display: flex;
        justify-content: end;
    }
`;

export const FolderAddBtn = styled(Button)`
    width: auto;
    font-size: ${getFontSize("lg")};
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
    width: calc((100% - 20px) / 2);
    padding: 36px 30px 40px;
    border-radius: 10px;
    border: 1px solid ${props => props.$radomcolor};
    background: #fff;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    &:hover {
        box-shadow: 0 4px 10px rgba(0, 0, 0, .5);
    }

    .cardHeader {
        display: flex;
        justify-content: space-between;

        .cardName {
            font-size: 30px;
            font-weight: bold;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: calc(100% - 100px);
        }

        .buttonBox {
            display: flex;

            button {
                width: 34px;
                height: 34px;
                background: url(${props => props.$EditIon})no-repeat 0 0 / cover;
                transition: transform .4s ease;

                &:hover {
                    transform: scale(2);
                }

                & + button {
                    margin-left: 10px;
                    background: url(${props => props.$DeleteIcon})no-repeat 0 0 / cover;
                }
            }
        }
    }

    .cardBody {
        margin-top: 1rem;

        .description {
            font-size: 1.125rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 400px;
        }

        .wordCountBox {
            margin-top: 70px;
            display: flex;
            justify-content: space-between;

            span:first-child {
                color: #ccc;
            }
            span:last-child {
                color: #4ea8e5;
            }
        }
    }

    &::after {
        content: '';
        display: block;
        height: 1.125rem;
        background: ${props => props.$radomcolor};
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
    }
`