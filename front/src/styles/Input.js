import styled, {css} from "styled-components";
import { getColor, getFontSize } from "../utils/themeUtils";

export const InputBoxStyle = css`
    label {
        font-size: ${getFontSize('lg')};
        font-weight: 600;
    }

    input {
        display: block;
        font-size: ${getFontSize('md')};
        margin-top: 14px;
        border: 1px solid ${getColor('gray_c')};
        width: 100%;
        padding: 1.125rem 1rem;
        border-radius: 6px;
    }
`;


export const TextareaBoxStyle = css`
    label {
        font-size: ${getFontSize('lg')};
        font-weight: 600;
    }

    textarea {
        display: block;
        font-size: ${getFontSize('md')};
        margin-top: 14px;
        border: 1px solid ${getColor('gray_c')};
        width: 100%;
        padding: 1.125rem 1rem;
        border-radius: 6px;
        resize: none;
    }
`;