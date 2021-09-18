import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function TouchableOpacityButton({
  text,
  onPress,
  buttonStyles,
  textStyles,
}) {
  if (buttonStyles == null || buttonStyles == undefined) {
    buttonStyles = {
      alignItems: "center",
      padding: 10,
      color: "white",
      backgroundColor: "#86C232",
    };
  }

  if (textStyles == null || textStyles == undefined) {
    textStyles = { color: "white", fontWeight: "bold" };
  }

  const styles = StyleSheet.create({
    button: buttonStyles,
    text: textStyles,
  });

  return (
    <TouchableOpacity style={styles.button} onPress={() => onPress()}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}
