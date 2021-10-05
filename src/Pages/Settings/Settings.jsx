import React, { useState } from "react";
import { View, Switch, StyleSheet, Text } from "react-native";
import { defaultMode, darkMode } from "../../ThemeProvider/ThemeManager";
export default function Settings({ navigation, route }) {
  console.log("Navigation ", navigation);
  console.log("Route ,", route);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    route.params.setTheme((prevTheme) => {
      if (prevTheme.mode === "dark") {
        return defaultMode;
      } else {
        return darkMode;
      }
    });
    setIsEnabled((previousState) => !previousState);
  };
  return (
    <View>
      <Text>Settings</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}
