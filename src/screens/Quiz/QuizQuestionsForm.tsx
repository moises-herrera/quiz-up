import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { styles } from './styles';
import { Button, Dialog, FormControl, Input } from '../../components/ui';
import { useAppDispatch, useAppSelector, useForm } from '../../hooks';
import { setCurrentFormStep } from '../../redux/quiz';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  NavigationProps,
  Question,
  QuestionAnswer,
  Quiz,
} from '../../interfaces';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { QuestionSchemaType, QuestionsSchema } from '../../schemas/quiz';
import { colors } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { useSaveQuizMutation } from '../../services';
import { displayToast } from '../../redux/ui';

export const QuizQuestionsForm = () => {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();
  const quiz = useAppSelector(({ quiz: { newQuiz } }) => newQuiz);
  const quizId = quiz?.id ?? '';

  const getNewQuestion = (): Question => {
    return {
      id: uuidv4(),
      question: '',
      options: [],
      quizId,
    };
  };

  const getAnswer = (): QuestionAnswer => {
    return { description: '', isCorrect: false };
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([getNewQuestion()]);
  const [answers, setAnswers] = useState<QuestionAnswer[]>([
    getAnswer(),
    getAnswer(),
  ]);
  const [questionActive, setQuestionActive] = useState<string>('');
  const { formState, onInputChange, handleSubmit, errors } =
    useForm<QuestionSchemaType>(
      {
        [questions[0].id]: questions[0],
      },
      QuestionsSchema
    );
  const [saveQuiz, { isLoading, isSuccess, isError }] = useSaveQuizMutation();

  const addQuestion = () => {
    setQuestions((questions) => [...questions, getNewQuestion()]);
  };

  const removeQuestion = (id: string): void => {
    const newQuestions = questions.filter((question) => question.id !== id);
    setQuestions(newQuestions);
  };

  const goBack = (): void => {
    dispatch(setCurrentFormStep(0));
  };

  const openAnswersModal = (questionId: string) => {
    setQuestionActive(questionId);
    setIsDialogOpen(true);
  };

  const addAnswer = () => {
    setAnswers((answers) => [...answers, getAnswer()]);
  };

  const removeAnswer = (index: number) => {
    setAnswers((answers) => answers.filter((_, i) => i !== index));
  };

  const markAsCorrect = (index: number) => {
    setAnswers((answers) =>
      answers.map((answer, i) =>
        i === index ? { ...answer, isCorrect: !answer.isCorrect } : answer
      )
    );
  };

  const onCloseAnswersModal = () => {
    setIsDialogOpen(false);
    onInputChange(questionActive, {
      ...formState[questionActive],
      options: answers,
    });
    setQuestionActive('');
    setAnswers([getAnswer(), getAnswer()]);
  };

  const saveQuestions = async () => {
    const questions = Object.values(formState);
    const quizToSave = {
      ...quiz,
      questions,
    } as Quiz;
    await saveQuiz(quizToSave);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        displayToast({
          message: 'Quiz creado correctamente',
          type: 'success',
        })
      );
      navigation.navigate('Home');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      dispatch(
        displayToast({
          message: 'Error al crear el quiz',
          type: 'error',
        })
      );
    }
  }, [isError]);

  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.container, { height: '100%' }]}
      >
        <Text style={styles.title}>Preguntas</Text>

        <ScrollView
          contentContainerStyle={{
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <View style={{ width: '90%', gap: 12 }}>
            {questions.map(({ id }, index) => (
              <View
                key={index}
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  gap: 6,
                  alignItems: 'center',
                }}
              >
                <Input
                  id={id}
                  value={formState[id]?.question ?? ''}
                  onChange={(id, value) => {
                    onInputChange(id, {
                      ...formState[id],
                      question: value,
                    });
                  }}
                  hasError={errors && errors[id] ? true : false}
                  placeholder="Escribe una pregunta"
                  multiline
                  numberOfLines={3}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    gap: 6,
                    justifyContent: 'center',
                  }}
                >
                  <MaterialCommunityIcons
                    name="pencil"
                    size={24}
                    color="black"
                    onPress={() => openAnswersModal(id)}
                  />
                  <Ionicons
                    name="close-circle-outline"
                    size={24}
                    color="black"
                    style={{ opacity: questions.length === 1 ? 0.4 : 1 }}
                    disabled={questions.length === 1}
                    onPress={() => removeQuestion(id)}
                  />
                </View>
              </View>
            ))}
          </View>

          <Button
            label="Agregar pregunta"
            style={{
              button: {
                height: 40,
                width: '100%',
                backgroundColor: 'white',
                borderWidth: 0.5,
                borderColor: 'black',
                padding: 0,
              },
              buttonText: { color: 'black' },
            }}
            onPress={addQuestion}
          />
        </ScrollView>

        <View style={styles.buttonsContainer}>
          <Button
            label="Atrás"
            style={{
              button: {
                width: '40%',
                backgroundColor: 'white',
                borderWidth: 0.5,
                borderColor: 'black',
              },
              buttonText: { color: 'black' },
            }}
            onPress={goBack}
          />
          <Button
            label="Guardar"
            style={{
              button: { width: '40%' },
            }}
            isLoading={isLoading}
            disabled={questions.length === 0 || errors !== null || isLoading}
            onPress={() => handleSubmit(saveQuestions)}
          />
        </View>
      </ScrollView>

      <Dialog isOpen={isDialogOpen} onClose={onCloseAnswersModal}>
        <Text style={styles.subTitle}>Opciones</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            gap: 12,
            justifyContent: 'center',
          }}
        >
          {answers.map((answer, index) => (
            <View
              key={index}
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: '90%',
                }}
              >
                <Input
                  id={`answer-${index}`}
                  value={answer.description}
                  onChange={(_id, value) => {
                    setAnswers((answers) =>
                      answers.map((answer, i) =>
                        i === index ? { ...answer, description: value } : answer
                      )
                    );
                  }}
                  hasError={!answer.description.trim()}
                  placeholder="Escribe una respuesta"
                  multiline
                  numberOfLines={2}
                />
              </View>
              <View
                style={{
                  width: '15%',
                  flexDirection: 'column',
                  gap: 6,
                  alignItems: 'center',
                }}
              >
                <Ionicons
                  name="checkmark"
                  size={24}
                  color={answer.isCorrect ? colors.success.primary : 'black'}
                  onPress={() => markAsCorrect(index)}
                />
                <Ionicons
                  name="close-circle-outline"
                  size={24}
                  color="black"
                  style={{ opacity: answers.length === 2 ? 0.4 : 1 }}
                  disabled={answers.length === 2}
                  onPress={() => removeAnswer(index)}
                />
              </View>
            </View>
          ))}

          <Button
            label="Agregar opción"
            style={{
              button: {
                height: 40,
                width: '100%',
                backgroundColor: 'white',
                borderWidth: 0.5,
                borderColor: 'black',
                padding: 0,
              },
              buttonText: { color: 'black' },
            }}
            disabled={answers.length >= 4}
            onPress={addAnswer}
          />
        </View>
      </Dialog>
    </>
  );
};
