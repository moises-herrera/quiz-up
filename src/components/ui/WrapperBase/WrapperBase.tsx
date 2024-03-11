import { FC } from 'react';
import { View } from 'react-native';
import { styles } from './styles';

interface WrapperBaseProps {
  children: React.ReactNode;
  style?: View['props']['style'];
}

export const WrapperBase: FC<WrapperBaseProps> = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};
