import { StyleSheet } from 'react-native';
import { colors } from '../../../theme';

export const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  errorInput: {
    borderColor: colors.error,
  },
});
