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

export default function Home() {
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
        <Button title="Getting started" />
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
