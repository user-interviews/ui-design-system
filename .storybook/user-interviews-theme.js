import { create } from '@storybook/theming';
import UILogo from '../public/ui-design-system-light.svg';

export default create({
  base: 'dark',
  brandTitle: 'User Interviews',
  brandUrl: 'https://github.com/user-interviews/ui-design-system',
  brandImage: UILogo,

  barBg: '#FFFFFF',
  barTextColor: '#444444',
  barSelectedColor: '#158D71',
  colorSecondary: '#158D71',
});
