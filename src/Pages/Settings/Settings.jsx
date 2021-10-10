import React, { useContext, useState } from "react";
import { View, Switch, StyleSheet, Text } from "react-native";
import { textStyleUtils } from "../../Styles/StyleUtils";
import {
  defaultMode,
  darkMode,
  themeContext,
} from "../../ThemeProvider/ThemeManager";

export default function Settings({ navigation, route }) {
  console.log("Navigation ", navigation);
  console.log("Route ,", route);
  const { applicationTheme } = useContext(themeContext);

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
      <View>
        <View style={styles.row}>
          <Text
            style={{
              ...textStyleUtils.text_fontSize_24,
              color: applicationTheme.styles.textColor,
            }}
          >
            Settings
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={{ color: applicationTheme.styles.textColor }}>
            Light
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={{ color: applicationTheme.styles.textColor }}>Dark</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
