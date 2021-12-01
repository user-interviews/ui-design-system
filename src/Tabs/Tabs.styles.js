import styled from 'styled-components';
import colors from '../Styles/colors/palette';

const borderWidth = '2px';
const fontType30 = '400 0.875rem/1.25rem DM Sans, sans-serif';

export const StyledTabsWrapper = styled.span`
  .nav-tabs {
    border-bottom: ${borderWidth} solid ${colors.UX_GRAY_400};
  }

  .nav-tabs .nav-link {
    color: ${colors.UX_GRAY_800};
    font: ${fontType30};
    text-decoration: none;
    border: none;
    border-radius: 0;
    border-bottom: ${borderWidth} solid ${colors.UX_GRAY_400};
    margin-bottom: -${borderWidth};
    padding: 0.375rem 0.75rem;
  }

  .nav-tabs .nav-link.active,
  .nav-tabs .nav-link:hover,
  .nav-tabs .nav-link:active,
  .nav-tabs .nav-link:focus {
    color: ${colors.UX_BLUE_500};
    border-bottom: ${borderWidth} solid ${colors.UX_BLUE_500};
  }

  .nav-tabs .nav-link.disabled {
    color: ${colors.UX_GRAY_600};
    border-bottom: ${borderWidth} solid ${colors.UX_GRAY_400};
  }
`;
