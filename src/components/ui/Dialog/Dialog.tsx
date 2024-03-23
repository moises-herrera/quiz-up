import { FC } from 'react';
import { Pressable, View } from 'react-native';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';

interface DialogProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
}

export const Dialog: FC<DialogProps> = ({
  children,
  isOpen = false,
  onClose,
}) => {
  return (
    <>
      {isOpen && (
        <View style={styles.dialogContainer}>
          <View style={styles.dialog}>
            <Pressable
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
              }}
              onPress={onClose}
            >
              <Ionicons name="close" size={24} color="black" />
            </Pressable>
            {children}
          </View>
        </View>
      )}
    </>
  );
};
