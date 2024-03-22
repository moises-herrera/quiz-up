import { createStackNavigator } from '@react-navigation/stack';
import { Home, Login, Register } from '../screens';
import { useAppSelector } from '../hooks';
import { LoadingScreen } from '../components/ui';

const Stack = createStackNavigator();

export const MainNavigator = () => {
  const status = useAppSelector(({ auth: { status } }) => status);

  if (status === 'loading') {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'white' },
      }}
    >
      <>
        {status !== 'authenticated' ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <Stack.Screen name="Home" component={Home} />
        )}
      </>
    </Stack.Navigator>
  );
};
