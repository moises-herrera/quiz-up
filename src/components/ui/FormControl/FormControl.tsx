import { FC } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

interface FormControlProps {
  label: string;
  children: React.ReactNode;
  fieldError?: string;
}

export const FormControl: FC<FormControlProps> = ({
  label,
  children,
  fieldError = '',
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      {children}
      {fieldError && <Text style={styles.error}>{fieldError}</Text>}
    </View>
  );
};
