import styled from 'styled-components';

import { Button } from 'react-bootstrap';

export const StyledButton = styled(Button)`
  background: ${({ theme, variant }) => theme.button[variant].backgroundColor};
  color: ${({ theme, variant }) => theme.button[variant].color};
  border: 2px solid ${({ theme, variant }) => theme.button[variant].borderColor};
  font-size: 1em;
  border-radius: 4px;
  box-sizing: border-box;
  margin: 1em;
  padding: 0.25em 1em;
`;
