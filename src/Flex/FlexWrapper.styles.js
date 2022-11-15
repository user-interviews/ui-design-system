import styled, { css } from 'styled-components';

export const FlexWrapper = styled.div`
  ${({
    container,
    direction,
    flexWrap,
    alignItems,
    gap,
    justifyContent,
    height,
    maxHeight,
    flex,
    flexBasis,
    flexGrow,
    flexShrink,
    width,
    maxWidth,
    justifySelf,
    alignSelf,
  }) =>

    css`
    display: ${container ? 'flex' : 'block'};

    ${direction &&
    css`
      flex-direction: ${direction};
    `}

    ${flexWrap &&
    css`
      flex-wrap: ${flexWrap};
    `}

    ${justifyContent &&
    css`
      justify-content: ${justifyContent};
    `}

    ${alignItems &&
    css`
      align-items: ${alignItems};
    `}

    ${gap &&
    css`
      gap: ${gap};
    `
    }

    ${height &&
    css`
      height: ${height};
    `}

    ${maxHeight &&
    css`
      max-height: ${maxHeight};
    `}

    ${width &&
    css`
      width: ${width};
    `}

    ${maxWidth &&
    css`
      max-width: ${maxWidth};
    `}

    ${flex &&
    css`
      flex: ${flex};
    `}

    ${flexGrow &&
    css`
      flex-grow: ${flexGrow};
    `}

    ${flexShrink &&
    css`
      flex-shrink: ${flexShrink};
    `}

    ${flexBasis &&
    css`
      flex-basis: ${flexBasis};
    `}

    ${alignSelf &&
    css`
      align-self: ${alignSelf};
    `}

    ${justifySelf &&
    css`
      justify-self: ${justifySelf};
    `}
  `}
`;
