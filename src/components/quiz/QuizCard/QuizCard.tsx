import { FC, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { NavigationProps, Question, Quiz } from '../../../interfaces';
import { styles } from './styles';
import { Button } from '../../ui';
import { Entypo } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useNavigation } from '@react-navigation/native';
import { removeQuiz, setActiveQuiz } from '../../../redux/quiz';
import { Menu } from 'react-native-paper';
import { useDeleteQuizMutation } from '../../../services';
import { displayToast } from '../../../redux/ui';
import { getQuizQuestions } from '../../../services/quiz.service';

export const QuizCard: FC<Quiz> = (quiz) => {
  const { title, image, categoryLabel, user } = quiz;
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(({ auth: { user } }) => user);
  const navigation = useNavigation<NavigationProps>();
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [deleteQuiz, { isSuccess, isError }] = useDeleteQuizMutation();

  const handleEdit = async () => {
    const response = await getQuizQuestions(quiz.id);
    const quizData = {
      quiz: {
        ...quiz,
        questions: (response as { data: Question[] }).data,
      },
    };
    dispatch(setActiveQuiz(quizData));
    navigation.navigate('QuizSettings');
  };

  const handleDelete = async () => {
    await deleteQuiz(quiz.id);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(removeQuiz(quiz.id));
      dispatch(
        displayToast({
          type: 'success',
          message: 'Quiz eliminado correctamente',
        })
      );
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      dispatch(
        displayToast({
          type: 'error',
          message: 'Error al eliminar el quiz',
        })
      );
    }
  }, [isError]);

  return (
    <View style={styles.card}>
      {currentUser?.username === user && (
        <View style={{ alignSelf: 'flex-end' }}>
          <Menu
            style={{ marginTop: 30 }}
            contentStyle={{ backgroundColor: 'white' }}
            visible={isMenuVisible}
            onDismiss={() => setIsMenuVisible(false)}
            anchor={
              <Entypo
                style={{ alignSelf: 'flex-end', marginBottom: 8 }}
                name="dots-three-vertical"
                size={20}
                color="black"
                onPress={() => setIsMenuVisible(true)}
              />
            }
          >
            <Menu.Item title="Editar" onPress={handleEdit} />
            <Menu.Item title="Eliminar" onPress={handleDelete} />
          </Menu>
        </View>
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
        <Text style={styles.categoryLabel}>{categoryLabel}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.username}>@{user}</Text>
      <Button label="Iniciar" onPress={() => {}} />
    </View>
  );
};
