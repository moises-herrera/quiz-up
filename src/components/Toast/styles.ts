import { StyleSheet } from 'react-native';

const baseStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 40,
    width: '80%',
    height: 72,
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    paddingLeft: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 8,
    borderLeftWidth: 6,
  },
});

export const toastStyles: {
  success: {
    container: StyleSheet.NamedStyles<unknown>;
    text: StyleSheet.NamedStyles<unknown>;
  };
  error: {
    container: StyleSheet.NamedStyles<unknown>;
    text: StyleSheet.NamedStyles<unknown>;
  };
} = {
  success: {
    container: {
      ...baseStyles.container,
      backgroundColor: '#eaf9f3',
      borderLeftColor: '#20aa7d',
    },
    text: {
      color: '#20aa7d',
    },
  },
  error: {
    container: {
      ...baseStyles.container,
      backgroundColor: '#fdedec',
      borderLeftColor: '#ff5757',
    },
    text: {
      color: '#ff5757',
    },
  },
};

export const styles: Record<keyof typeof toastStyles, any> = {
  success: toastStyles.success,
  error: toastStyles.error,
};
