import { ScrollView, Text, View } from 'react-native';
import { Button, FormControl, Input } from '../../components/ui';
import { QuizSchema, type QuizSchemaType } from '../../schemas/quiz';
import { useForm } from '../../hooks';
import { styles } from './styles';

const initialForm: QuizSchemaType = {
  title: '',
  description: '',
  image: '',
  category: '',
  questions: [],
};

export const QuizForm = () => {
  const {
    formState: { title, description },
    onInputChange,
    onBlur,
    errors,
  } = useForm<QuizSchemaType>(initialForm, QuizSchema);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Quiz</Text>

      <FormControl label="Título" fieldError={errors?.title}>
        <Input
          id="title"
          value={title}
          onChange={onInputChange}
          onBlur={onBlur}
          hasError={!!errors?.title}
        />
      </FormControl>

      <FormControl label="Descripción" fieldError={errors?.description}>
        <Input
          id="description"
          value={description}
          multiline
          onChange={onInputChange}
          onBlur={onBlur}
          hasError={!!errors?.description}
        />
      </FormControl>

      <FormControl label="Categoría" fieldError={errors?.category}>
        <Input
          id="category"
          value={title}
          onChange={onInputChange}
          onBlur={onBlur}
          hasError={!!errors?.category}
        />
      </FormControl>

      <View style={styles.buttonsContainer}>
        <Button
          label="Cancelar"
          style={{
            button: {
              width: '40%',
              backgroundColor: 'white',
              borderWidth: 0.5,
              borderColor: 'black',
            },
            buttonText: { color: 'black' },
          }}
          onPress={() => {}}
        />
        <Button
          label="Guardar"
          style={{
            button: { width: '40%' },
          }}
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  );
};
