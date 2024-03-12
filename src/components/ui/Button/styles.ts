import { StyleSheet } from 'react-native';
import { colors } from '../../../theme';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
  },
  buttonText: { color: 'white' },
  disabled: {
    opacity: 0.6,
  },
});
