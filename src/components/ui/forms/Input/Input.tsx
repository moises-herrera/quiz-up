import { FC } from 'react';
import { KeyboardTypeOptions, TextInput } from 'react-native';
import { styles } from './styles';

interface InputProps {
  id: string;
  value?: string;
  placeholder?: string;
  onChange: (id: string, value: string) => void;
  onBlur?: (id: string) => void;
  type?: KeyboardTypeOptions;
  style?: TextInput['props']['style'];
  autoCapitalize?: TextInput['props']['autoCapitalize'];
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  hasError?: boolean;
}

export const Input: FC<InputProps> = ({
  id,
  value = '',
  placeholder = '',
  onChange,
  onBlur,
  type,
  style = styles.input,
  autoCapitalize = 'none',
  secureTextEntry = false,
  multiline = false,
  numberOfLines,
  hasError = false,
}) => {
  return (
    <TextInput
      id={id}
      nativeID={id}
      value={value}
      placeholder={placeholder}
      onChangeText={(value) => onChange(id, value)}
      onBlur={() => onBlur && onBlur(id)}
      keyboardType={type}
      secureTextEntry={secureTextEntry}
      style={[style, hasError && styles.errorInput]}
      autoCapitalize={autoCapitalize}
      textAlignVertical={multiline ? 'top' : 'center'}
      multiline={multiline}
      numberOfLines={
        multiline && numberOfLines ? numberOfLines : multiline ? 4 : 1
      }
    />
  );
};
