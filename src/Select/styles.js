import systemColors from 'src/Styles/colors';
import fontWeights from '../Styles/fontWeights';

export const SELECT_SIZES = { SMALL: 'small' };

const getHeightProps = (size) => {
  if (size === SELECT_SIZES.SMALL) {
    return {
      height: '2.25rem',
      minHeight: '2.25rem',
    };
  }
  return null;
};

/*
 To set styles for your item, make sure your option object has a child `colors` object
 with a text and/or hover key defined to override the defaults
 */
const defaultStyles = ({ size }) => ({
    control: (styles, { isDisabled }) => ({
      ...styles,
      ...getHeightProps(size),
      backgroundColor: isDisabled ? systemColors.inputDisabledBg : styles.backgroundColor,
      borderColor: systemColors.inputBorderColor,
    }),
    dropdownIndicator: (styles) => ({ ...styles, color: systemColors.UX_GRAY_600 }),
    indicatorSeparator: (styles) => ({ ...styles, display: 'none' }),
    singleValue: (styles, { data }) => ({
      ...styles,
      color: (
        (data.colors ? data.colors.text : systemColors.UX_GRAY_900) || systemColors.UX_GRAY_900
      ),
      fontWeight: fontWeights.light,
    }),
    option: (styles, {
      data,
      isDisabled,
      isFocused,
      isSelected,
    }) => {
      const colors = data.colors || {};

      return {
        ...styles,
        backgroundColor: isSelected || isFocused ? colors.hover : styles.backgroundColor,
        color: colors.text,
        fontWeight: fontWeights.light,
        cursor: 'pointer',

        ':active': {
          ...styles[':active'],
          backgroundColor:
            !isDisabled && isSelected ? systemColors.UX_GRAY_200 : styles[':active'].backgroundColor,
        },

        ':hover': {
          ...styles[':hover'],
          backgroundColor: colors.hover || systemColors.UX_GRAY_200,
        },
      };
    },
});

const defaultTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: theme.colors.neutral20,
  },
});

export {
  defaultStyles,
  defaultTheme,
};
