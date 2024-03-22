import { FC, useEffect } from 'react';
import { Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Input, FormControl, WrapperBase } from '../../components/ui';
import { useAppDispatch, useForm } from '../../hooks';
import { SignUpSchema, SignUpSchemaType } from '../../schemas/auth';
import { styles } from './styles';
import type { FormSubmitHandler } from '../../interfaces';
import { useRegisterUserMutation } from '../../services';
import { setCredentials } from '../../redux/auth';
import { displayToast } from '../../redux/ui';

interface RegisterProps extends StackScreenProps<any, any> {}

const initialForm: SignUpSchemaType = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const Register: FC<RegisterProps> = ({ navigation }) => {
  const {
    formState: {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
    },
    errors,
    onInputChange,
    onBlur,
    handleSubmit,
  } = useForm<SignUpSchemaType>(initialForm, SignUpSchema);
  const dispatch = useAppDispatch();
  const [registerUser, { isLoading, isSuccess, isError }] =
    useRegisterUserMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        displayToast({
          message: 'Usuario registrado correctamente',
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
          message: 'Error al registrar el usuario',
          type: 'error',
        })
      );
    }
  }, [isError]);

  const onSubmit: FormSubmitHandler<SignUpSchemaType> = async (data) => {
    const user = await registerUser(data).unwrap();
    dispatch(setCredentials(user));
  };

  return (
    <WrapperBase style={styles.container}>
      <View>
        <Text style={styles.title}>Registrarse</Text>
      </View>

      <View style={styles.form}>
        <FormControl label="Nombre" fieldError={errors?.firstName}>
          <Input
            id="firstName"
            value={firstName}
            onChange={onInputChange}
            onBlur={onBlur}
            hasError={!!errors?.firstName}
            autoCapitalize="words"
          />
        </FormControl>

        <FormControl label="Apellido" fieldError={errors?.lastName}>
          <Input
            id="lastName"
            value={lastName}
            onChange={onInputChange}
            onBlur={onBlur}
            hasError={!!errors?.lastName}
            autoCapitalize="words"
          />
        </FormControl>

        <FormControl label="Nombre de usuario" fieldError={errors?.username}>
          <Input
            id="username"
            value={username}
            onChange={onInputChange}
            onBlur={onBlur}
            hasError={!!errors?.username}
          />
        </FormControl>

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

        <FormControl
          label="Confirmar contraseña"
          fieldError={errors?.confirmPassword}
        >
          <Input
            id="confirmPassword"
            value={confirmPassword}
            onChange={onInputChange}
            onBlur={onBlur}
            secureTextEntry={true}
            hasError={!!errors?.confirmPassword}
          />
        </FormControl>

        <Button
          onPress={() => handleSubmit(onSubmit)}
          label="Registrarse"
          isLoading={isLoading}
        />

        <View>
          <Text
            style={{
              textAlign: 'center',
            }}
          >
            ¿Ya tienes una cuenta?{' '}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('Login')}
            >
              Iniciar sesión
            </Text>
          </Text>
        </View>
      </View>
    </WrapperBase>
  );
};
