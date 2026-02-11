import { Stack } from 'expo-router';

export default function RegisterLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // custom headers use karenge
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="phone" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="expertise" />
      <Stack.Screen name="documents" />
      <Stack.Screen name="pending" />
      <Stack.Screen name="approved" />
      <Stack.Screen name="blueprint" />
    </Stack>
  );
}
