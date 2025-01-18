import { Stack } from "expo-router";

import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack screenOptions={{ title: "Power Voltage Converter" }} />
    </PaperProvider>
  );
}
