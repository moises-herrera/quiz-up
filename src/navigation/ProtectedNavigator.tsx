import { TopMenu } from '../components/navigation';
import { QuizSettings, Home, Settings } from '../screens';
import { WrapperBase } from '../components/ui';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme';
import { TabParamList } from '../interfaces';

const Tab = createMaterialBottomTabNavigator<TabParamList>();

export const ProtectedNavigator = () => {
  return (
    <WrapperBase
      style={{
        height: '100%',
      }}
    >
      <TopMenu />
      <Tab.Navigator
        initialRouteName="Home"
        activeColor={colors.primary}
        inactiveColor={colors.accent}
        barStyle={{ backgroundColor: 'white' }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Inicio',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="QuizSettings"
          component={QuizSettings}
          options={{
            tabBarLabel: 'Crear',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="add-box" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: 'Configuración',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="settings" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </WrapperBase>
  );
};
