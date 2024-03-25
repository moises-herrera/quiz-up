import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from './MainNavigator';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ToastList } from '../components/ui';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../theme';

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <MainNavigator />
          <ToastList />
        </Provider>
      </PaperProvider>
    </NavigationContainer>
  );
};
