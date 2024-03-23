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
  style?: Partial<{
    button: StyleProp<ViewStyle>;
    buttonText: StyleProp<any>;
    disabled: StyleProp<ViewStyle>;
  }>;
}

export const Button: FC<ButtonProps> = ({
  label,
  onPress,
  disabled = false,
  isLoading = false,
  style,
}) => {
  return (
    <Pressable
      style={[
        styles.button,
        (disabled || isLoading) && styles.disabled,
        style?.button,
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      <View style={styles.content}>
        {isLoading && (
          <ActivityIndicator
            size="small"
            color={style?.buttonText?.color ?? styles.buttonText.color}
          />
        )}
        <Text style={[styles.buttonText, style?.buttonText]}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
};
