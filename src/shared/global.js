import { createGlobalStyle, css } from 'styled-components';
import { color, typography } from './styles';

export const bodyStyles = css`
  font-family: ${typography.type.primary};
  font-size: ${typography.size.s2}px;
  color: ${color.darkest};
`;

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato:300,300italic,400,700:latin');

  body {
    ${bodyStyles}
  }
`;
