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
    gap: 10,
    paddingLeft: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
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
      color: colors.error.primary,
    },
  },
};
