import { FC } from 'react';
import { Text, View } from 'react-native';
import { toastStyles } from './styles';
import { ToastMessage } from '../../../interfaces';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme';

interface ToastProps {
  message: string;
  type: ToastMessage;
  onClose?: () => void;
}

export const Toast: FC<ToastProps> = ({ message, type, onClose }) => {
  const styles = toastStyles[type];
  const iconName = type === 'success' ? 'checkmark' : 'close-circle-outline';
  const iconColor =
    type === 'success' ? colors.success.primary : colors.error.primary;

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Ionicons name={iconName} size={24} color={iconColor} />
        <Text style={styles.text} numberOfLines={2}>{message}</Text>
        <Ionicons name="close" size={24} color={iconColor} />
      </View>
    </View>
  );
};
