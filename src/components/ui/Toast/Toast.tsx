import { FC } from 'react';
import { Text, View } from 'react-native';
import { toastStyles } from './styles';

interface ToastProps {
  message: string;
  type: 'error' | 'success';
  onClose?: () => void;
}

export const Toast: FC<ToastProps> = ({ message, type, onClose }) => {
  return (
    <View style={toastStyles[type].container}>
      <Text style={toastStyles[type].text}>{message}</Text>
    </View>
  );
};
