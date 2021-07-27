import systemColors from 'src/Styles/colors';
import fontWeights from '../Styles/fontWeights';

export const SELECT_SIZES = { SMALL: 'small' };

const getHeightProps = (size) => {
  if (size === SELECT_SIZES.SMALL) {
    return {
      height: 'auto',
      minHeight: '36px', // rem units don't work for this
    };
  }
  return null;
};

function getBorderStyles(isFocused, isSelected) {
  return {
    boxShadow: (isFocused || isSelected) ? 'inset 0 1px 1px rgba(0, 0, 0, 0.08)' : 'none',
    borderColor: (
      (isFocused || isSelected) ? systemColors.UX_BLUE_300 : systemColors.inputBorderColor
    )
  }
}

/*
 To set styles for your item, make sure your option object has a child `colors` object
 with a text and/or hover key defined to override the defaults
 */
const defaultStyles = ({ size }) => ({
    control: (styles, { isDisabled, isFocused, isSelected }) => ({
      ...styles,
      ...getHeightProps(size),
      backgroundColor: isDisabled ? systemColors.inputDisabledBg : styles.backgroundColor,
      ...getBorderStyles(isFocused, isSelected),
      ':hover': {
        ...styles[':hover'],
        ...getBorderStyles(isFocused, isSelected),
      },
    }),
    dropdownIndicator: (styles) => ({ ...styles, color: systemColors.UX_GRAY_600 }),
    indicatorSeparator: (styles) => ({ ...styles, display: 'none' }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: systemColors.UX_BLUE_100,
      color: systemColors.UX_BLUE_700,
      borderRadius: '.25rem',
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: systemColors.UX_BLUE_700,
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.25rem',
      paddingLeft: '.5rem',
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: systemColors.UX_BLUE,
      cursor: 'pointer',
      ':hover': {
        ...styles[':hover'],
        backgroundColor: systemColors.selectOptionFocusedBg,
        color: systemColors.UX_BLUE_700,
      },
    }),
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
        fontSize: '0.875rem',
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
