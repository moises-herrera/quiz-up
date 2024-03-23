import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type TabParamList = {
  Home: undefined;
  CreateQuiz: undefined;
  Settings: undefined;
};

/**
 * Navigation props for the app.
 */
export type NavigationProps = BottomTabNavigationProp<TabParamList>;
