import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type TabParamList = {
  Home: undefined;
  QuizSettings: undefined;
  Settings: undefined;
};

/**
 * Navigation props for the app.
 */
export type NavigationProps = BottomTabNavigationProp<TabParamList>;
