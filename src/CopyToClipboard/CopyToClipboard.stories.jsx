import CopyToClipboard from 'src/CopyToClipboard';

export default {
  title: 'Components/Copy To Clipboard',
  component: CopyToClipboard,
  parameters: {
    controls: { exclude: [] },
  },
  args: {
    copyText: 'the text getting copied',
    trackingEvent: 'tracking-event',
  },
  argTypes: {
    copyText: { control: { type: 'text' } },
  },
};

export const Primary = {};
