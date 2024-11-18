import systemColors from '../Styles/colors';
import fontWeights from '../Styles/fontWeights';

export const SELECT_SIZES = { SMALL: 'small' };

export const SIZE_SMALL_HEIGHT = {
  height: 'auto',
  minHeight: '36px',
};

const getHeightProps = (size) => {
  if (size === SELECT_SIZES.SMALL) {
    return SIZE_SMALL_HEIGHT;
  }
  return null;
};

function getBorderStyles(isFocused, isSelected) {
  return {
    borderColor: (
      (isFocused || isSelected) ? systemColors.UX_BLUE_500 : systemColors.inputBorderColor
    ),
  };
}

/*
 To set styles for your item, make sure your option object has a child `colors` object
 with a text and/or hover key defined to override the defaults
 */
const defaultStyles = ({ menuWidth, size }) => ({
    control: (styles, { isDisabled, isFocused, isSelected }) => ({
      ...styles,
      ...getHeightProps(size),
      backgroundColor: isDisabled ? systemColors.inputDisabledBg : styles.backgroundColor,
      ...getBorderStyles(isFocused, isSelected),
      ':hover': {
        ...styles[':hover'],
        ...getBorderStyles(isFocused, isSelected),
        cursor: 'pointer',
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
      backgroundColor: systemColors.SYNTH_HOVER_STATE,
      color: systemColors.SYNTH_SUCCESS_GREEN_DARK,
      borderRadius: '4px',
    }),
    menu: (styles) => ({
      ...styles,
      width: !menuWidth ? '100%' : menuWidth,
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: systemColors.SYNTH_SUCCESS_GREEN_DARK,
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.25rem',
      paddingLeft: '8px',
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: systemColors.SYNTH_SUCCESS_GREEN_DARK,
      cursor: 'pointer',
      ':hover': {
        ...styles[':hover'],
        backgroundColor: systemColors.SYNTH_SELECTED_STATE_GREEN,
        color: systemColors.SYNTH_SUCCESS_GREEN_DARK,
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
      isFocused,
      isSelected,
    }) => {
      const getBackgroundColor = () => {
        if (isDisabled) return systemColors.SYNTH_ALERT_BG_NEUTRAL;
        if (isSelected || isFocused) return systemColors.SYNTH_HOVER_STATE;
        return styles.backgroundColor;
      };

      const getHoverBackgroundColor = () => {
        if (isDisabled) return systemColors.SYNTH_ALERT_BG_NEUTRAL;
        if (isSelected) return systemColors.SYNTH_SELECTED_STATE_GREEN;
        return systemColors.SYNTH_HOVER_STATE;
      };

      return {
        ...styles,
        backgroundColor: getBackgroundColor(),
        color: isDisabled ? systemColors.SYNTH_UNSELECTED_NEUTRAL : systemColors.UX_GRAY_900,
        fontWeight: fontWeights.light,
        fontSize: '0.875rem',
        cursor: isDisabled ? 'default' : 'pointer',

        ':active': {
          ...styles[':active'],
          backgroundColor:
            !isDisabled && isSelected ? systemColors.UX_GRAY_200 : styles[':active'].backgroundColor,
        },

        ':hover': {
          ...styles[':hover'],
          backgroundColor: getHoverBackgroundColor(),
        },
      };
    },
});

const borderedMultiValueStyles = (borderedMultiValue) => borderedMultiValue ? {
  multiValue: (styles) => (
    {
      ...styles,
      border: `1px solid ${systemColors.SYNTH_DARK_BACKGROUND_SELECTED_BLUE}`,
      borderRadius: '4px',
      backgroundColor: systemColors.UX_WHITE,
    }
  ),
  multiValueLabel: (styles) => (
    {
      ...styles,
      color: systemColors.SYNTH_DARK_BACKGROUND_SELECTED_BLUE,
    }
  ),
  multiValueRemove: (styles) => (
    {
      ...styles,
      color: systemColors.SYNTH_DARK_BACKGROUND_SELECTED_BLUE,
      ':hover': {
        backgroundColor: systemColors.UX_NAVY_500,
        color: systemColors.UX_WHITE,
      },
    }
  ),
} : {};

const defaultTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: theme.colors.neutral20,
  },
});

export {
  borderedMultiValueStyles,
  defaultStyles,
  defaultTheme,
};
