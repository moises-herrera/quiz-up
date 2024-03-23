import { QuizForm } from './QuizForm';
import { QuizQuestionsForm } from './QuizQuestionsForm';
import { useAppSelector } from '../../hooks';
import { QuizSchemaType } from '../../schemas/quiz';

export const CreateQuiz = () => {
  const currentFormStep = useAppSelector(
    ({ quiz: { currentFormStep } }) => currentFormStep
  );
  const newQuiz = useAppSelector(({ quiz: { newQuiz } }) => newQuiz);

  return (
    <>
      {currentFormStep === 0 && (
        <QuizForm initialValues={newQuiz as QuizSchemaType} />
      )}
      {currentFormStep === 1 && <QuizQuestionsForm />}
    </>
  );
};
