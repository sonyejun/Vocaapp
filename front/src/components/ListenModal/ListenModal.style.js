import styled from "styled-components";
import { ModalStyle } from "../../styles/Modal";
import { getColor } from "../../utils/themeUtils";

export const ListenModalBox = styled.div`
    ${ModalStyle};
    .modalInnerBox {
        width: 600px;

        .listenBtn  {
            width: 100%;
            padding: 24px 0;
            box-shadow: 2px 4px 4px rgba(150, 150, 150, 0.25);
            border-radius: 6px;

            & + button {
                margin-top: 30px;
            }

            &:active {
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.25) inset;
            }

            &.all {
                border: 1px solid ${getColor('tertiary')};
                color: ${getColor('tertiary')};

                &:hover {
                    background: ${getColor('tertiary')};
                    color: #fff;
                }
            };

            &.memorized {
                border: 1px solid ${getColor('secondary')};
                color: ${getColor('secondary')};

                &:hover {
                    background: ${getColor('secondary')};
                    color: #fff;
                }
            };

            &.unmemorized {
                border: 1px solid ${getColor('quinary')};
                color: ${getColor('quinary')};

                &:hover {
                    background: ${getColor('quinary')};
                    color: #fff;
                }
            };
        }
    }
`;
