import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from '.';

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};
