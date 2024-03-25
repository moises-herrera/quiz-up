import { FC } from 'react';
import { ScrollView } from 'react-native';
import { Quiz } from '../../../interfaces';
import { QuizCard } from '../QuizCard';
import { styles } from './styles';

interface QuizListProps {
  quizList: Quiz[];
}

export const QuizList: FC<QuizListProps> = ({ quizList }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {quizList.map((quiz) => (
        <QuizCard key={quiz.id} {...quiz} />
      ))}
    </ScrollView>
  );
};
