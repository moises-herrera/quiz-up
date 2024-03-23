import { createStackNavigator } from '@react-navigation/stack';
import { Login, Register } from '../screens';
import { useAppSelector } from '../hooks';
import { LoadingScreen } from '../components/ui';
import { RootStackParamList } from '../interfaces';
import { ProtectedNavigator } from './ProtectedNavigator';

const RootStack = createStackNavigator<RootStackParamList>();

export const MainNavigator = () => {
  const status = useAppSelector(({ auth: { status } }) => status);

  if (status === 'loading') {
    return <LoadingScreen />;
  }

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'white' },
      }}
    >
      <>
        {status !== 'authenticated' ? (
          <>
            <RootStack.Screen name="Login" component={Login} />
            <RootStack.Screen name="Register" component={Register} />
          </>
        ) : (
          <RootStack.Screen
            name="ProtectedNavigator"
            component={ProtectedNavigator}
          />
        )}
      </>
    </RootStack.Navigator>
  );
};
