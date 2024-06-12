import styled, {css} from "styled-components";
import { getColor } from "../utils/themeUtils";

export const ModalStyle = css`
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    
    .modalInnerBox {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 14px;
        overflow: hidden;
        width: 600px;
        
        .modalHeader {
            padding: 10px 32px;
            background: ${getColor('primary')};
            
            .closeBtn {
                display: block;
                position: relative;
                width: 30px;
                height: 30px;
                margin-left: auto;

                &:hover span {
                    background: ${getColor('text')};
                }
                span {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 30px;
                    height: 4px;
                    background: ${getColor("gray_c")};
                    transform-origin: center center;
                }

                span:first-child {
                    transform: translate(-50%, -50%) rotate(45deg);
                }
                span:last-child {
                    transform: translate(-50%, -50%) rotate(-45deg);
                }
            }
        }

        .modalBody {
            padding: 32px;
            background: #fff;
        }
    }
`;
