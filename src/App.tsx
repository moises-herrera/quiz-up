import { registerRootComponent } from 'expo';
import { AppNavigation } from './navigation';

export default function App() {
  return <AppNavigation />;
}

registerRootComponent(App);
