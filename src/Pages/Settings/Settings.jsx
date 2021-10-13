import React, { useContext, useState } from "react";
import { View, Switch, StyleSheet, Text } from "react-native";
import { textStyleUtils } from "../../Styles/StyleUtils";
import {
  defaultMode,
  darkMode,
  themeContext,
} from "../../ThemeProvider/ThemeManager";
import { translationsContext } from "../../translations/LocaleManager";
import en from "../../translations/en";
import he from "../../translations/he";
import app from "../../translations/he/app";

export default function Settings({ navigation, route }) {
  const { applicationTheme } = useContext(themeContext);
  const { language } = useContext(translationsContext);

  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabledLanguage, setIsEnabledLanguage] = useState(false);
  const toggleSwitch = (param) => {
    if (param == "Theme") {
      route.params.setTheme((prevTheme) => {
        if (prevTheme.mode === "dark") {
          return defaultMode;
        } else {
          return darkMode;
        }
      });
      setIsEnabled((previousState) => !previousState);
    } else {
      route.params.setLanguage((prev) => {
        if (prev.language == "English") {
          return he;
        } else {
          console.log("hereeee");
          return en;
        }
      });
      setIsEnabledLanguage((previousState) => !previousState);
    }
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
            {language.app.light}
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSwitch("Theme")}
            value={isEnabled}
          />
          <Text style={{ color: applicationTheme.styles.textColor }}>
            {language.app.dark}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={{ color: applicationTheme.styles.textColor }}>
            {language.app.language_hebrew}
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabledLanguage ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSwitch("Language")}
            value={isEnabledLanguage}
          />
          <Text style={{ color: applicationTheme.styles.textColor }}>
            {language.app.language_english}
          </Text>
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
