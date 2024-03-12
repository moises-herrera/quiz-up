import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.primary,
  },
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 18,
    paddingHorizontal: 40,
    overflow: 'scroll',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 12,
    overflow: 'scroll',
  },
  link: {
    color: colors.primary,
    textAlign: 'center',
    marginTop: 14,
    fontWeight: 'bold',
  },
});
