import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
//import * as Updates from 'expo-updates';
import Navigation from './app/navigation/Navigation';
import useCachedResources from './app/hooks/useCachedResources';
import AppStoreProvider from './app/store/StoreProvider';
import { enableScreens } from 'react-native-screens';
//import { LoaderModal } from './app/modals/LoaderModal';
//import { translate } from './app/services/translate.service';
import { AppConfig } from './app/config/App.config';
import { StatusBar } from 'expo-status-bar';
import { Colors } from './app/themes';

enableScreens();

export default function App() {
  const isLoadingComplete = useCachedResources();
  //const [updating, setUpdating] = useState(false);

  /* useEffect(() => {
    async function runUpdates() {
      try {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable && Updates.releaseChannel.startsWith(AppConfig.releaseChannel)) {
          setUpdating(true);
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
          setUpdating(false)
        }
      } catch (e) {
        console.warn("App updating error: ", e);
        setUpdating(false)
      } finally {
        setUpdating(false);
      }
    };

    if (AppConfig.updatesEnabled && !__DEV__) {
      runUpdates();
    }
  }, []); */

  if (!isLoadingComplete) {
    SplashScreen.preventAutoHideAsync();
    return null;
  } else {
    return (
      <AppStoreProvider>
        {/* <LoaderModal loading={updating} text={translate.get("text-updates-running")} /> */}
        <StatusBar
          style={AppConfig.statusbarStyle}
          backgroundColor={Colors.statusBar}
          translucent={false}
        />
        <Navigation />
      </AppStoreProvider>
    );
  }
}
