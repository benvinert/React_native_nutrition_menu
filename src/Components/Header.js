import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Create Nutrition menu</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingTop: 25,
    backgroundColor: "coral",
  },
  title: {
    alignItems: "center",
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
