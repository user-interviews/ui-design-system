import colors from '../src/Styles/colors/palette';
import '../scss/global.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      options: {
        "--ux-white": {
          name: '--ux-white',
          value: colors.UX_WHITE,
        },

        "--ux-cream": {
          name: '--ux-cream',
          value: colors.UX_CREAM,
        },

        "--ux-emerald-600": {
          name: '--ux-emerald-600',
          value: colors.UX_EMERALD_600,
        },

        "--ux-neutral-800": {
          name: '--ux-neutral-800',
          value: colors.UX_NEUTRAL_800,
        }
      }
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Foundations', 'Components'],
      },
    },
  },

  initialGlobals: {
    backgrounds: {
      value: '--ux-white'
    }
  },

  tags: ['autodocs']
};

export default preview;
