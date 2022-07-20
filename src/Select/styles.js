import systemColors from 'src/Styles/colors';
import fontWeights from '../Styles/fontWeights';

export const SELECT_SIZES = { SMALL: 'small' };

export const SIZE_SMALL_HEIGHT = {
  height: 'auto',
  minHeight: '2.25rem',
};

const getHeightProps = (size) => {
  if (size === SELECT_SIZES.SMALL) {
    return SIZE_SMALL_HEIGHT;
  }
  return null;
};

function getBorderStyles(isFocused, isSelected) {
  return {
    boxShadow: (isFocused || isSelected) ? '0px 0px 8px 0px #66AFE9B2;' : 'none',
    borderColor: (
      (isFocused || isSelected) ? systemColors.UX_BLUE_500 : systemColors.inputBorderColor
    ),
  };
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
    clearIndicator: (styles) => ({
      ...styles,
      cursor: 'pointer',
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      color: systemColors.UX_GRAY_600,
      cursor: 'pointer',
    }),
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
    placeholder: (styles) => ({
      ...styles,
      color: systemColors.UX_GRAY_800,
      fontWeight: '300',
    }),
    singleValue: (styles, { data }) => ({
      ...styles,
      color: (
        (data.colors ? data.colors.text : systemColors.UX_GRAY_900) || systemColors.UX_GRAY_900
      ),
      fontWeight: fontWeights.light,
    }),
    option: (styles, {
      isDisabled,
      isSelected,
    }) => ({
        ...styles,
        backgroundColor: isSelected ? systemColors.UX_BLUE_200 : styles.backgroundColor,
        color: systemColors.UX_BLACK,
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
          backgroundColor: isSelected ? systemColors.UX_BLUE_200 : systemColors.UX_BLUE_100,
        },
      }),
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
