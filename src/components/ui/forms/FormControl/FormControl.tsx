import { FC } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { styles } from './styles';

interface FormControlProps {
  label?: string;
  children: React.ReactNode;
  fieldError?: string;
  style?: StyleProp<ViewStyle>;
}

export const FormControl: FC<FormControlProps> = ({
  label,
  children,
  fieldError = '',
  style = {},
}) => {
  return (
    <View style={style}>
      {label && <Text style={styles.label}>{label}</Text>}
      {children}
      {fieldError && <Text style={styles.error}>{fieldError}</Text>}
    </View>
  );
};
