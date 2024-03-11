import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from './MainNavigator';

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};
