import { Stack } from 'expo-router';
import React from 'react';

export default function StackLayout() {
  // const activeTintColor = useThemeColor({ light: '#11181C', dark: '#ECEDEE' }, 'tint');

  return (
    <Stack 
      initialRouteName='schedulesList'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="schedulesList"/>
      <Stack.Screen name="createSchedule"/>
      <Stack.Screen name="schedule/[id]"/>
    </Stack>
  );
}
