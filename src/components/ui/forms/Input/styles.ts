import { StyleSheet } from 'react-native';
import { colors } from '../../../../theme';

export const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderRadius: 6,
    borderColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  errorInput: {
    borderColor: colors.error.primary,
  },
});
