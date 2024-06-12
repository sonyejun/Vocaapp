import styled from "styled-components";
import { ModalStyle } from "../../styles/Modal";
import { getColor } from "../../utils/themeUtils";
import { ToggleSwitchStyle } from "../../styles/ToggleSwitch";

export const WordReadModalBox = styled.div`
    ${ModalStyle};
    .modalInnerBox {
        width: 600px;

        .modalBody {
            > div {
                padding: 20px 10px;
                
                & + div {
                    border-top: 1px solid ${getColor('gray_c')};
                }

                &.wordBox {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-radius: 4px;
                    padding: 10px 10px 32px;

                    .word {
                        width: calc(100% - 50px);
                        word-wrap: break-word;
                        word-break: keep-all;
                        font-size: 2rem;
                        font-weight: bold;
                    }

                    .soundBtn {
                        position: relative;
                        width: 42px;
                        height: 42px;
                        background: #F3F1F1;
                        border-radius: 8px;
                        
                        &::after {
                            content: '';
                            display: block;
                            width: 24px;
                            height: 24px;
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            background: url(${props => props.$SoundIcon}) no-repeat 0 0 / cover;
                            margin-top: -12px;
                            margin-left: -12px;
                        }

                        &:active {
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.25) inset;
                        }
                    }
                }

                .textLabel {
                    font-size: 1.125rem;
                    font-weight: bold;
                }
                .text {
                    margin-top: 16px;
                    word-break: keep-all;
                    line-height: 130%;
                }
            }
        }
    }
`;

export const ToggleSwitchBox = styled.div`
    ${ToggleSwitchStyle};
    margin-top: 16px;
`;