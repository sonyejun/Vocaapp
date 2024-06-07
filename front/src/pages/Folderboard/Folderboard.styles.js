import styled from "styled-components";
import { Button } from "../../styles/Button";
import { getFontSize } from "../../utils/themeUtils";


export const FolderBox = styled.div`
    .buttonBox {
        display: flex;
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
    transition: transform .5s ease;

    &:hover {
        transform: scale(1.05);
        z-index: 1;
    }

    .cardHeader {
        display: flex;
        justify-content: space-between;

        .cardName {
            color: ${props => props.$radomcolor};
            font-size: 30px;
            font-weight: bold;
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