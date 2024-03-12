import { FC } from 'react';
import { Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Input, FormControl, WrapperBase } from '../../components/ui';
import { useAppDispatch, useForm } from '../../hooks';
import { LoginSchema, LoginSchemaType } from '../../schemas/auth';
import { styles } from './styles';
import { FormSubmitHandler } from '../../interfaces';
import { useLoginUserMutation } from '../../services';
import { setCredentials } from '../../redux/auth';

interface LoginProps extends StackScreenProps<any, any> {}

const initialForm: LoginSchemaType = {
  email: '',
  password: '',
};

export const Login: FC<LoginProps> = ({ navigation }) => {
  const {
    formState: { email, password },
    errors,
    onInputChange,
    onBlur,
    handleSubmit,
  } = useForm<LoginSchemaType>(initialForm, LoginSchema);
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginUserMutation();

  const onSubmit: FormSubmitHandler<LoginSchemaType> = async (data) => {
    const user = await login(data).unwrap();
    dispatch(setCredentials(user));
  };

  return (
    <WrapperBase style={styles.container}>
      <View>
        <Text style={styles.title}>Login</Text>
      </View>

      <View style={styles.form}>
        <FormControl label="Email" fieldError={errors?.email}>
          <Input
            id="email"
            type="email-address"
            value={email}
            onChange={onInputChange}
            onBlur={onBlur}
            hasError={!!errors?.email}
          />
        </FormControl>

        <FormControl label="Contraseña" fieldError={errors?.password}>
          <Input
            id="password"
            value={password}
            onChange={onInputChange}
            onBlur={onBlur}
            secureTextEntry={true}
            hasError={!!errors?.password}
          />
        </FormControl>

        <Button
          onPress={() => handleSubmit(onSubmit)}
          label="Login"
          isLoading={isLoading}
        />

        <View>
          <Text
            style={{
              textAlign: 'center',
            }}
          >
            ¿No tienes una cuenta?{' '}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('Login')}
            >
              Regístrate
            </Text>
          </Text>
        </View>
      </View>
    </WrapperBase>
  );
};
