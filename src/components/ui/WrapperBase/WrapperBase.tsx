import { FC } from 'react';
import { SafeAreaView, View } from 'react-native';
import { styles } from './styles';

interface WrapperBaseProps {
  children: React.ReactNode;
  style?: View['props']['style'];
}

export const WrapperBase: FC<WrapperBaseProps> = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
};
