import { FC } from 'react';
import { Text, View } from 'react-native';
import { toastStyles } from './styles';
import { ToastMessage } from '../../../interfaces';

interface ToastProps {
  message: string;
  type: ToastMessage;
  onClose?: () => void;
}

export const Toast: FC<ToastProps> = ({ message, type, onClose }) => {
  return (
    <View style={toastStyles[type].container}>
      <View style={toastStyles[type].messageContainer}>
        <Text style={toastStyles[type].text}>{message}</Text>
      </View>
    </View>
  );
};
