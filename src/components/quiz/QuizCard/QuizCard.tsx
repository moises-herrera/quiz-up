import { FC } from 'react';
import { Image, Text, View } from 'react-native';
import { Quiz } from '../../../interfaces';
import { styles } from './styles';
import { Button } from '../../ui';
import { Entypo } from '@expo/vector-icons';
import { useAppSelector } from '../../../hooks';

export const QuizCard: FC<Quiz> = ({ title, image, category, user }) => {
  const currentUser = useAppSelector(({ auth: { user } }) => user);

  return (
    <View style={styles.card}>
      {currentUser?.username === user && (
        <Entypo
          style={{ alignSelf: 'flex-end', marginBottom: 8 }}
          name="dots-three-vertical"
          size={20}
          color="black"
        />
      )}
      <View style={{ gap: 6 }}>
        {
          <Image
            style={{ width: '100%', height: 150, borderRadius: 8 }}
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
