import { View } from 'react-native';
import { styles } from './styles';
import { useLazyGetQuizzesQuery } from '../../services';
import { useEffect } from 'react';
import { QuizList } from '../../components/quiz';
import { LoadingScreen } from '../../components/ui';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setQuizzes } from '../../redux/quiz';

export const Home = () => {
  const dispatch = useAppDispatch();
  const [getQuizzes, { data }] = useLazyGetQuizzesQuery();
  const quizzes = useAppSelector(({ quiz: { quizzes } }) => quizzes);

  useEffect(() => {
    getQuizzes();
  }, []);

  useEffect(() => {
    if (data?.length) {
      dispatch(setQuizzes(data));
    }
  }, [data]);

  return (
    <View style={styles.content}>
      {quizzes ? <QuizList quizList={quizzes} /> : <LoadingScreen />}
    </View>
  );
};
