import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './presentation/navigation/StackNavigation';

function App() {

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </>
  );
}

export default App;
