import { FC } from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { styles } from './styles';

interface ButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  isLoading?: boolean;
  style?: {
    button: StyleProp<ViewStyle>;
    buttonText: StyleProp<ViewStyle>;
    disabled: StyleProp<ViewStyle>;
  };
}

export const Button: FC<ButtonProps> = ({
  label,
  onPress,
  disabled = false,
  isLoading = false,
  style = styles,
}) => {
  return (
    <Pressable
      style={[style.button, (disabled || isLoading) && style.disabled]}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      <View style={styles.content}>
        {isLoading && (
          <ActivityIndicator size="small" color={styles.buttonText.color} />
        )}
        <Text style={style.buttonText}>{label}</Text>
      </View>
    </Pressable>
  );
};
