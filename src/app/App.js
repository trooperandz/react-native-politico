import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { LogBox, SafeAreaView, StyleSheet } from 'react-native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light as darkTheme } from '@eva-design/eva';
import { Provider } from 'react-redux';

import GlobalErrorModal from '../components/GlobalErrorModal';
import store from './store';
import RootNavigation from '../navigations';

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={darkTheme}>
        <SafeAreaView style={styles.core}>
          <GlobalErrorModal />
          <RootNavigation />
        </SafeAreaView>
      </ApplicationProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  core: {
    flex: 1,
  },
});

export default App;
