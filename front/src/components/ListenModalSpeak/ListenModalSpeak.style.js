import styled from "styled-components";
import { ModalStyle } from "../../styles/Modal";
import { getColor } from "../../utils/themeUtils";

export const ListenModalBoxSpeakBox = styled.div`
    ${ModalStyle};
    .modalInnerBox {
        width: 600px;

        .modalBody {
            .modalTitle {
                font-weight: 600;
                font-size: 1.25rem;
            }
            
            button {
                display: block;
                margin: 20px auto;
                width: 200px;
                height: 200px;
                transition: transform .5s ease;
                &:hover {
                    transform: scale(1.1);
                }
                &.on {
                    background: url(${props => props.$SoundIcon}) no-repeat 0 0 / cover;
                }
                &.off {
                    background: url(${props => props.$SoundStopIcon}) no-repeat 0 0 / cover;
                }
            }

            .textBox {
                margin-top: 16px;
                > div {
                    padding: 16px 0;
                    & + div {
                       border-top: 1px solid ${getColor('gray_c')};
                    }
                    .word {
                        color: ${getColor('primary')};
                        font-size: 1.5rem;
                        font-weight: bold;
                    }
        
                    .textLabel {
                        font-size: 1rem;
                        font-weight: 500;
                        color: ${getColor('gray')};
                    }
        
                    .text {
                        font-size: 1.125rem;
                        margin-top: 14px;
                        font-weight: bold;
                    }
                }
            }
        }
    }
`