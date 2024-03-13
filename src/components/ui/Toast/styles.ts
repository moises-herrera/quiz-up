import { StyleSheet } from 'react-native';
import { ToastStyles } from '../../../interfaces';
import { colors } from '../../../theme';

const baseStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 40,
    width: '100%',
    height: 72,
    backgroundColor: 'black',
    borderRadius: 8,
    borderLeftWidth: 6,
  },
  messageContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    paddingLeft: 14,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  text: {
    width: '75%',
  },
});

export const toastStyles: ToastStyles = {
  success: {
    container: {
      ...baseStyles.container,
      backgroundColor: colors.success.secondary,
      borderLeftColor: colors.success.primary,
    },
    messageContainer: {
      ...baseStyles.messageContainer,
      backgroundColor: colors.success.secondary,
    },
    text: {
      ...baseStyles.text,
      color: colors.success.primary,
    },
  },
  error: {
    container: {
      ...baseStyles.container,
      backgroundColor: colors.error.secondary,
      borderLeftColor: colors.error.primary,
    },
    messageContainer: {
      ...baseStyles.messageContainer,
      backgroundColor: colors.error.secondary,
    },
    text: {
      ...baseStyles.text,
      color: colors.error.primary,
    },
  },
};
