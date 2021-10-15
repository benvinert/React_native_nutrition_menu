import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  Image,
  ImageBackground,
} from "react-native";
import { themeContext } from "../../ThemeProvider/ThemeManager";
import { useNavigation } from "@react-navigation/native";
import { translationsContext } from "../../translations/LocaleManager";
export default function Home() {
  const navigation = useNavigation();
  const { language } = useContext(translationsContext);
  const { applicationTheme } = useContext(themeContext);
  return (
    <SafeAreaView>
      <Image
        source={{
          uri: "https://static.toiimg.com/thumb/81551320.cms?width=680&height=512&imgsize=967762",
        }}
        resizeMode="cover"
        style={{
          width: "100%",
          height: "80%",
        }}
      />
      <View styles={styles.container}>
        <Button
          title={language.app.ready_to_get_healthy}
          onPress={() => navigation.navigate("Create Menu")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
