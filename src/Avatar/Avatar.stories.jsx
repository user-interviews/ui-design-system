import Avatar from 'src/Avatar';
import mdx from './Avatar.mdx';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['name'],
    },
  },
  args: {
    initials: 'KS',
  },
  argTypes: {
    colorId: { control: 'number' },
  },
};

export const Primary = {
  args: {},
};

export const WithAlert = {
  args: {
    showAlert: true,
  },
};

export const WithImage = {
  args: {
    image: 'https://placehold.it/160/160',
    large: true,
  },
};
