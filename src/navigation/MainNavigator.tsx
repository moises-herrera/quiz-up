import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../screens';

const Stack = createStackNavigator();

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};
