import CopyToClipboardButton, { ButtonVariants } from 'src/CopyToClipboardButton';

export default {
  title: 'Components/Copy To Clipboard Button',
  component: CopyToClipboardButton,
  parameters: {
    controls: { exclude: [] },
  },
  args: {
    copyText: 'the text getting copied',
    displayText: 'displayed text',
    trackingEvent: 'tracking-event',
    variant: {
      options: Object.values(ButtonVariants),
      mapping: ButtonVariants,
      control: { type: 'select' },
    },
  },
  argTypes: {
    copyText: { control: { type: 'text' } },
  },
};

export const Primary = {};
