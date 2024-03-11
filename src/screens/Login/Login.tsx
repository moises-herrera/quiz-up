import { FC } from 'react';
import { Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Input, FormControl, WrapperBase } from '../../components/ui';
import { useForm } from '../../hooks';
import { LoginSchema, LoginSchemaType } from '../../schemas/auth';
import { styles } from './styles';

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
    handleSubmit,
  } = useForm<LoginSchemaType>(initialForm, LoginSchema);

  const onSubmit = () => {
    console.log({ email, password });
    console.log(errors);
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
            hasError={!!errors?.email}
          />
        </FormControl>

        <FormControl label="Contraseña" fieldError={errors?.password}>
          <Input
            id="password"
            value={password}
            onChange={onInputChange}
            hasError={!!errors?.password}
          />
        </FormControl>

        <Button onPress={() => handleSubmit(onSubmit)} label="Login" />
      </View>
    </WrapperBase>
  );
};
