import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from './MainNavigator';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ToastList } from '../components/ui';

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <MainNavigator />
        <ToastList />
      </Provider>
    </NavigationContainer>
  );
};
