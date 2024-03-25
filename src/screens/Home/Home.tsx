import { View } from 'react-native';
import { styles } from './styles';
import { useLazyGetQuizzesQuery } from '../../services';
import { useEffect } from 'react';
import { QuizList } from '../../components/quiz';
import { LoadingScreen } from '../../components/ui';

export const Home = () => {
  const [getQuizzes, { data }] = useLazyGetQuizzesQuery();

  useEffect(() => {
    getQuizzes();
  }, []);

  return (
    <View style={styles.content}>
      {data ? <QuizList quizList={data} /> : <LoadingScreen />}
    </View>
  );
};
