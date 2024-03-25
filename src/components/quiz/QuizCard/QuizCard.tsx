import { FC } from 'react';
import { Image, Text, View } from 'react-native';
import { Quiz } from '../../../interfaces';
import { styles } from './styles';
import { Button } from '../../ui';

export const QuizCard: FC<Quiz> = ({ title, image, category, user }) => {
  return (
    <View style={styles.card}>
      <View style={{ gap: 6 }}>
        {
          <Image
            style={{ width: '100%', height: 150 }}
            source={
              image
                ? { uri: image }
                : require('../../../assets/upload-image.png')
            }
          />
        }
        <Text style={styles.categoryLabel}>{category}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.username}>@{user}</Text>
      <Button label="Iniciar" onPress={() => {}} />
    </View>
  );
};
