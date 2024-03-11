import { FC } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  Text,
  ViewStyle,
} from 'react-native';
import { styles } from './styles';

interface ButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: { button: StyleProp<ViewStyle>; buttonText: StyleProp<ViewStyle> };
}

export const Button: FC<ButtonProps> = ({ label, onPress, style = styles }) => {
  return (
    <Pressable style={style.button} onPress={onPress}>
      <Text style={style.buttonText}>{label}</Text>
    </Pressable>
  );
};
