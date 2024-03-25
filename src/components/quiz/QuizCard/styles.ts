import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    width: 330,
    height: 350,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryLabel: {
    backgroundColor: 'white',
    padding: 4,
    fontSize: 12,
    borderWidth: 0.5,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  username: {
    fontSize: 12,
    alignSelf: 'flex-end',
  },
});
