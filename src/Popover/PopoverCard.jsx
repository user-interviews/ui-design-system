import styled from 'styled-components';

import PopoverBody from './PopoverBody';

const handleWidth = (cardSize) => {
  switch (cardSize) {
    case 'sm':
      return '32rem';
    case 'md':
      return '40rem';
    default:
      return '32rem';
  }
};

const PopoverCard = styled(PopoverBody)`
  padding: 1.5rem;
  width: ${({ size }) => handleWidth(size)};
`;

export default PopoverCard;
