import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { useColorScheme } from 'hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });


  // const [appIsReady, setAppIsReady] = useState(false);

  // const [fontsLoaded] = useFonts({
  //   Inter_300Light,
  //   Inter_400Regular,
  //   Inter_500Medium,
  //   Inter_600SemiBold,
  //   Inter_700Bold,
  // });

  // useEffect(() => {
  //   // If the app change the focus, return true or false to react-query focus manager.
  //   const subscription = AppState.addEventListener('change', onAppStateChange);
  //   return () => subscription.remove();
  // }, []);

  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       if (fontsLoaded) {
  //         await hideAsync();
  //         setAppIsReady(true);
  //       }
  //     } catch (e) {
  //       console.warn(e);
  //     }
  //   }

  //   prepare();
  // }, [fontsLoaded]);

  // function onAppStateChange(status: AppStateStatus) {
  //   if (Platform.OS !== 'web') {
  //     focusManager.setFocused(status === 'active');
  //   }
  // }

  // if (!appIsReady) {
  //   return <SplashScreen />;
  // }
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
