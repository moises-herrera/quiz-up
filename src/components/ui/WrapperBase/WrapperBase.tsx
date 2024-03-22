import { FC } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { styles } from './styles';

interface WrapperBaseProps {
  children: React.ReactNode;
  style?: View['props']['style'];
}

export const WrapperBase: FC<WrapperBaseProps> = ({ children, style }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView style={style}>{children}</SafeAreaView>
    </ScrollView>
  );
};
