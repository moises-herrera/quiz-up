import { FC } from 'react';
import { KeyboardTypeOptions, TextInput } from 'react-native';
import { styles } from './styles';

interface InputProps {
  id: string;
  value?: string;
  onChange: (id: string, value: string) => void;
  type?: KeyboardTypeOptions;
  style?: TextInput['props']['style'];
  autoCapitalize?: TextInput['props']['autoCapitalize'];
  hasError?: boolean;
}

export const Input: FC<InputProps> = ({
  id,
  value = '',
  onChange,
  type,
  style = styles.input,
  autoCapitalize = 'none',
  hasError = false,
}) => {
  return (
    <TextInput
      id={id}
      nativeID={id}
      value={value}
      onChangeText={(value) => onChange(id, value)}
      keyboardType={type}
      secureTextEntry={id === 'password'}
      style={[style, hasError && styles.errorInput]}
      autoCapitalize={autoCapitalize}
    />
  );
};
