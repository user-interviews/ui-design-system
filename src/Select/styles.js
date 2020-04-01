import systemColors from 'src/Styles/colors';

/*
 To set styles for your item, make sure your option object has a child `colors` object
 with a text and/or hover key defined to override the defaults
 */
const defaultStyles = {
  control: (styles, { isDisabled }) => ({
    ...styles,
    backgroundColor: isDisabled ? systemColors.inputDisabledBg : styles.backgroundColor,
    borderColor: systemColors.inputBorderColor,
  }),
  indicatorSeparator: (styles) => ({ ...styles, display: 'none' }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: (data.colors ? data.colors.text : systemColors.uxGray600) || systemColors.uxGray600,
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
      cursor: 'pointer',

      ':active': {
        ...styles[':active'],
        backgroundColor:
          !isDisabled && isSelected ? systemColors.uxGray200 : styles[':active'].backgroundColor,
      },

      ':hover': {
        ...styles[':hover'],
        backgroundColor: colors.hover || systemColors.uxGray200,
      },
    };
  },
};

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
