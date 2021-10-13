import React, { useContext } from "react";
import { View, Text, StyleSheet, Button, SafeAreaView } from "react-native";
import { themeContext } from "../../ThemeProvider/ThemeManager";

export default function Home() {
  const { applicationTheme } = useContext(themeContext);
  console.log(applicationTheme);
  return (
    <SafeAreaView>
      <Button title="heyy" />
      <Text styles={styles.container}>
        dasdsafsafsagsagsagsagsa fsa fsa gsa
      </Text>
      <View styles={styles.container}>
        <Text styles={{ fontSize: 15 }}>dsaddsasa</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderColor: "blue",
    backgroundColor: "green",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
