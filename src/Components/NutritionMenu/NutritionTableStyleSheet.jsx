import React, { useContext } from "react";
import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import { Cell } from "react-native-tableview-simple";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { removeFoodFromMenu } from "./NutritionTableService";
import { createMenuContext } from "../../Components/NutritionMenu/Context/createMenuContext";
import { themeContext } from "../../ThemeProvider/ThemeManager";

export const CellVariant = ({
  foodDetails,
  indexOfMeal,
  title,
  isEditable,
}) => {
  const navigation = useNavigation();
  const { menuState, menuDispatch } = useContext(createMenuContext);
  const { applicationTheme } = useContext(themeContext);

  return (
    <Cell
      onPress={() => navigation.navigate("Values of food", foodDetails)}
      cellContentView={
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            flex: 1,
            paddingVertical: 10,
          }}
        >
          {isEditable ? (
            <View>
              <Button
                title=""
                icon={
                  <Icon
                    name="trash"
                    iconFamily="FontAwesome"
                    size={15}
                    color="white"
                  />
                }
                iconRight
                onPress={() =>
                  removeFoodFromMenu(
                    indexOfMeal,
                    foodDetails.index,
                    menuDispatch
                  )
                }
              />
            </View>
          ) : null}

          <Text
            allowFontScaling
            numberOfLines={1}
            style={{ flex: 1, fontSize: 20 }}
          >
            {title}
          </Text>
        </View>
      }
    />
  );
};

export const HeaderSection = ({ mealTime, indexOfMeal, isEditable }) => {
  const { applicationTheme } = useContext(themeContext);
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    mealTimeStyle: {
      fontSize: 19,
      paddingLeft: 5,
      alignSelf: "center",
      color: applicationTheme.styles.textColor,
    },
  });

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
