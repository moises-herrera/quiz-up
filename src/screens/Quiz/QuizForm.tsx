import { ScrollView, Text, View } from 'react-native';
import {
  Button,
  FileUpload,
  FormControl,
  Input,
  Select,
} from '../../components/ui';
import { QuizSchema, type QuizSchemaType } from '../../schemas/quiz';
import { useAppDispatch, useAppSelector, useForm } from '../../hooks';
import { styles } from './styles';
import { FormSubmitHandler, Quiz, SelectOption } from '../../interfaces';
import { FC, useEffect, useState } from 'react';
import { useLazyGetCategoriesQuery } from '../../services';
import { parseCategoriesOptions } from '../../helpers';
import { clearNewQuiz, setNewQuiz } from '../../redux/quiz';
import { useNavigation } from '@react-navigation/native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const initialForm: QuizSchemaType = {
  title: '',
  description: '',
  image: '',
  category: '',
  questions: [],
};

interface QuizFormProps {
  initialValues?: QuizSchemaType;
}

export const QuizForm: FC<QuizFormProps> = ({ initialValues }) => {
  const dispatch = useAppDispatch();
  const username = useAppSelector(({ auth: { user } }) => user?.username);
  const {
    formState: { title, description, image, category },
    onInputChange,
    onBlur,
    errors,
    handleSubmit,
  } = useForm<QuizSchemaType>(initialValues ?? initialForm, QuizSchema);
  const navigation = useNavigation();
  const [getCategories] = useLazyGetCategoriesQuery();
  const [categories, setCategories] = useState<SelectOption[]>([]);

  const setCategoriesOptions = async () => {
    const categories = await getCategories().unwrap();
    setCategories(parseCategoriesOptions(categories));
  };

  useEffect(() => {
    setCategoriesOptions();
  }, []);

  const onSubmit: FormSubmitHandler<QuizSchemaType> = (values) => {
    const quiz = {
      ...values,
      id: uuidv4(),
      user: username,
    } as Quiz;
    dispatch(setNewQuiz(quiz));
  };

  const onCancel = (): void => {
    dispatch(clearNewQuiz());
    navigation.goBack();
  };

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

      <FormControl label="Imagen" fieldError={errors?.image}>
        <FileUpload id="image" file={image} setFile={onInputChange} />
      </FormControl>

      <FormControl label="Categoría" fieldError={errors?.category}>
        <Select
          id="category"
          value={category}
          options={categories}
          onChange={onInputChange}
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
          onPress={onCancel}
        />
        <Button
          label="Siguiente"
          style={{
            button: { width: '40%' },
          }}
          disabled={false}
          onPress={() => handleSubmit(onSubmit)}
        />
      </View>
    </ScrollView>
  );
};
