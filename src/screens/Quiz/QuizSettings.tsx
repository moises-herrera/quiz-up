import { QuizForm } from './QuizForm';
import { QuizQuestionsForm } from './QuizQuestionsForm';
import { useAppSelector } from '../../hooks';
import { QuizSchemaType } from '../../schemas/quiz';

export const QuizSettings = () => {
  const currentFormStep = useAppSelector(
    ({ quiz: { currentFormStep } }) => currentFormStep
  );
  const quizActive = useAppSelector(({ quiz: { quizActive } }) => quizActive);

  return (
    <>
      {currentFormStep === 0 && (
        <QuizForm initialValues={quizActive as QuizSchemaType} />
      )}
      {currentFormStep === 1 && <QuizQuestionsForm />}
    </>
  );
};
