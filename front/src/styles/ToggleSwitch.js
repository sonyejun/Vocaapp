import styled, { css } from 'styled-components';
import { getColor } from '../utils/themeUtils';

export const ToggleSwitchStyle = css`
    position: relative;
    width: 90px;
    height: 38px;

    .toggleInput {
        display: none;
    }

    .toggleLabel {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: ${getColor('gray_c')};
        transition: .4s;
        border-radius: 100px;
    }

    .toggleLabel:before {
        position: absolute;
        content: "";
        height: 32px;
        width: 32px;
        left: 3px;
        bottom: 3px;
        background-color: #fff;
        transition: .4s;
        border-radius: 50%;
    }

    .toggleInput:checked + .toggleLabel {
        background-color: ${getColor('primary')};
    }

    .toggleInput:checked + .toggleLabel:before {
        transform: translateX(52px);
    }
`;