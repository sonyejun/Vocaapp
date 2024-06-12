import styled from "styled-components";
import { ModalStyle } from "../../styles/Modal";
import { InputBoxStyle, TextareaBoxStyle } from "../../styles/Input";
import { Button } from "../../styles/Button";
import { selectStyle } from "../../styles/SelectBox";

export const WordCUModalBox = styled.div`
    ${ModalStyle};
    .modalInnerBox {
        width: 600px;
    }
`;

export const WordModalSelectOuterBox = styled.div`
    .selectBoxLabel {
        font-size: 1.25rem;
        font-weight: 600;
    }
    select {
        ${selectStyle};
        display: block;
        font-size: 1.125rem;
        margin-top: 14px;
        border: 1px solid #ccc;
        width: 100%;
        padding: 1.125rem 1rem;
        border-radius: 6px;
        box-shadow: none;

        &:focus {
            outline: 2px solid #015FCC;
        }
    }
`

export const WordModalInputBox = styled.div`
    ${InputBoxStyle};
    margin-top: 20px;
`;

export const WordSuccessBtn = styled(Button)`
    margin-top: 20px;
    padding: 1rem 1.25rem;
`;