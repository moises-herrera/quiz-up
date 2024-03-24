import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { Button, Dialog, Input } from '../../components/ui';
import { colors } from '../../theme';
import { styles } from './styles';
import { QuestionAnswer } from '../../interfaces';
import { Ionicons } from '@expo/vector-icons';
import { getAnswer } from '../../helpers';

interface AnswersDialogProps {
  isOpen: boolean;
  onClose: () => void;
  answers: QuestionAnswer[];
  setAnswers: React.Dispatch<React.SetStateAction<QuestionAnswer[]>>;
}

export const AnswersDialog: FC<AnswersDialogProps> = ({
  isOpen,
  onClose,
  answers,
  setAnswers,
}) => {
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

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <>
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
      </>
    </Dialog>
  );
};
