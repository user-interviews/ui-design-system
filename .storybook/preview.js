import colors from '../src/Styles/colors/palette';

const preview = {
  parameters: {
    backgrounds: {
      default: '$ux-white',
      values: [
        {
          name: '$ux-white',
          value: colors.UX_WHITE,
        },
        {
          name: '$ux-cream',
          value: colors.UX_CREAM,
        },
        {
          name: '$ux-emerald-600',
          value: colors.UX_EMERALD_600,
        },
        {
          name: '$ux-neutral-800',
          value: colors.UX_NEUTRAL_800,
        }
      ],
    },
    options: {
      storySort: {
        order: ['Foundations', 'Components'],
      },
    },
  }
};

export default preview;
