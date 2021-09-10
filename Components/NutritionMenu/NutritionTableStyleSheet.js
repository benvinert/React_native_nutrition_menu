import React from "react";
import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import { Cell } from "react-native-tableview-simple";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-elements";

export const CellVariant = (props) => {
  const navigation = useNavigation();
  return (
    <Cell
      onPress={() => navigation.navigate("Values of food", props.foodDetails)}
      {...props}
      cellContentView={
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            flex: 1,
            paddingVertical: 10,
          }}
        >
          <Text
            allowFontScaling
            numberOfLines={1}
            style={{ flex: 1, fontSize: 20 }}
          >
            {props.title}
          </Text>
        </View>
      }
    />
  );
};

export const HeaderSection = ({ mealTime, indexOfMeal, isEditable }) => {
  const navigation = useNavigation();

  const AddButton = () => {
    return (
      <TouchableHighlight>
        <View>
          <Button
            title="Add"
            onPress={() => navigation.navigate("Add food", indexOfMeal)}
          />
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={styles.mealTimeStyle}>{mealTime}</Text>
      {isEditable ? <AddButton /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mealTimeStyle: {
    fontSize: 19,
    paddingLeft: 5,
    alignSelf: "center",
  },
});
