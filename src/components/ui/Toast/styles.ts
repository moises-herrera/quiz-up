import { StatusBar, StyleSheet } from 'react-native';
import { ToastStyles } from '../../../interfaces';
import { colors } from '../../../theme';

export const baseStyles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    bottom: StatusBar.currentHeight || 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 320,
    height: 72,
    borderRadius: 8,
    borderLeftWidth: 6,
  },
  messageContainer: {
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
