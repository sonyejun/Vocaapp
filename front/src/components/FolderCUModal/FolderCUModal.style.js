import styled from "styled-components";
import { ModalStyle } from "../../styles/Modal";
import { InputBoxStyle, TextareaBoxStyle } from "../../styles/Input";
import { Button } from "../../styles/Button";

export const FolderCUModalBox = styled.div`
    ${ModalStyle};
    .modalInnerBox {
        width: 600px;
    }
`;

export const FolderModalInputBox = styled.div`
    ${InputBoxStyle};
`;

export const FolderModalTextareaBox = styled.div`
    ${TextareaBoxStyle};

    margin-top: 20px;

    textarea {
        height: 200px;
    }
`;

export const FolderSuccessBtn = styled(Button)`
    margin-top: 20px;
    padding: 1rem 1.25rem;
`;