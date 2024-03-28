import colors from '../src/Styles/colors/palette';

const preview = {
  decorators: [
    (Story) => (
      <div className="Synthesized">
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </div>
    ),
  ],
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
