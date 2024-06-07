import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const buttonStyle = css`
  display: block;
  width: 100%;
  padding: 0.75rem 1.5rem;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: bold;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;

  &:active {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25) inset;
  }
`;

export const Button = styled.button`
  ${buttonStyle}
`;

export const LinkButton = styled(Link)`
  ${buttonStyle}
`