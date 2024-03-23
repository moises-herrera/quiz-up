import { Text, View } from 'react-native';
import { styles } from './styles';

export const TopMenu = () => {
  return (
    <View style={styles.menu}>
      <Text style={styles.title}>QuizUp</Text>
    </View>
  );
};
