import { FC, useEffect } from 'react';
import { Text, View } from 'react-native';
import { baseStyles, toastStyles } from './styles';
import { ToastMessage } from '../../../interfaces';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme';

interface ToastProps {
  message: string;
  type: ToastMessage;
  onClose: () => void;
}

export const Toast: FC<ToastProps> = ({ message, type, onClose }) => {
  const styles = toastStyles[type];
  const iconName = type === 'success' ? 'checkmark' : 'close-circle-outline';
  const iconColor =
    type === 'success' ? colors.success.primary : colors.error.primary;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={baseStyles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <Ionicons name={iconName} size={24} color={iconColor} />
          <Text style={styles.text} numberOfLines={2}>
            {message}
          </Text>
          <Ionicons
            name="close"
            size={24}
            color={iconColor}
            onPress={() => onClose()}
          />
        </View>
      </View>
    </View>
  );
};
