export const baseTheme = {
  button: {
    primary: {
      color: '#fff',
      backgroundColor: '#6DBD63',
      borderColor: '#6DBD63',
    },
    'outline-primary': {
      color: '#6DBD63',
      backgroundColor: 'transparent',
      borderColor: '#6DBD63',
    },
    'ghost-primary': {
      color: '#6DBD63',
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    'embedded-primary': {
      color: '#6DBD63',
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    secondary: {
      color: '#000',
      backgroundColor: '#F7DD58',
      borderColor: '#F7DD58',
    },
    'outline-secondary': {
      color: '#F7DD58',
      backgroundColor: 'transparent',
      borderColor: '#F7DD58',
    },
    'ghost-secondary': {
      color: '#F7DD58',
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    'embedded-secondary': {
      color: '#F7DD58',
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    tertiary: {
      color: '#fff',
      backgroundColor: '#616161',
      borderColor: '#616161',
    },
    'outline-tertiary': {
      color: '#616161',
      backgroundColor: 'transparent',
      borderColor: '#616161',
    },
    'ghost-tertiary': {
      color: '#616161',
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    'embedded-tertiary': {
      color: '#616161',
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    delete: {
      color: '#fff',
      backgroundColor: '#E03131',
      borderColor: '#E03131',
    },
    'outline-delete': {
      color: '#E03131',
      backgroundColor: 'transparent',
      borderColor: '#E03131',
    },
    'ghost-delete': {
      color: '#E03131',
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    'embedded-delete': {
      color: '#E03131',
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
  },
};

export const participantTheme = {
  button: {
    primary: {
      color: '#fff',
      backgroundColor: '#337AB7',
      borderColor: '#337AB7',
    },
    'outline-primary': {
      color: '#337AB7',
      backgroundColor: 'transparent',
      borderColor: '#337AB7',
    },
    'ghost-primary': {
      color: '#337AB7',
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    'embedded-primary': {
      color: '#337AB7',
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    secondary: baseTheme.button.secondary,
    'outline-secondary': baseTheme.button['outline-secondary'],
    'ghost-secondary': baseTheme.button['ghost-secondary'],
    'embedded-secondary': baseTheme.button['embedded-secondary'],
    tertiary: baseTheme.button.tertiary,
    'outline-tertiary': baseTheme.button['outline-tertiary'],
    'ghost-tertiary': baseTheme.button['ghost-tertiary'],
    'embedded-tertiary': baseTheme.button['embedded-tertiary'],
    delete: baseTheme.button.delete,
    'outline-delete': baseTheme.button['outline-delete'],
    'ghost-delete': baseTheme.button['ghost-delete'],
    'embedded-delete': baseTheme.button['embedded-delete'],
    borderRadius: baseTheme.button.borderRadius,
  },
};
