import styled,{css} from "styled-components";

export const selectStyle = css`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 0 3rem 0 1.25rem;
    border: 1px solid #F1F1F1;
    border-radius: 6px;
    box-shadow: 0 4px 6px rgba(188, 188, 188, 0.25);
    font-size: 1.125rem;
    color: #333333;
    background-color: #fff;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>'); /* 오른쪽 화살표 아이콘 추가 */
    background-repeat: no-repeat;
    background-position: right 8px center;

    &::-ms-expand {
        display: none;
    }

    // &:focus::-ms-value {
    //     color: inherit;
    //     background-color: inherit;
    // }
`;