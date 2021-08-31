import React, { useState, useMemo, useContext } from "react";
import Autocomplete from "react-native-autocomplete-input";
import { StyleSheet, View, StatusBar, Button } from "react-native";
import { metafoods } from "../../Utils/metafoods";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import ValuesOfFood from "./ValuesOfFood";
import { serverPath, getFood } from "../../Utils/EndPoints";
import { createMenuContext } from "./Context/createMenuContext";

export const AutoComplete = ({ route }) => {
  const { menuState, menuDispatch } = useContext(createMenuContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const [valuesOfFood, setValuesOfFood] = useState(null);
  const [showValues, setShowValues] = useState(false);
  const indexOfMeal = route.params;
  const addCurrentFoodToMenu = () => {
    // add here logic to add food
    menuDispatch({
      execute: "add_food",
      param: { valuesOfFood: valuesOfFood, indexOfMeal: indexOfMeal },
    });
  };

  const getFoodById = async (food) => {
    fetch(`${serverPath}${getFood.getFoodById}${food.id}`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setValuesOfFood({ ...jsonResponse, name: food.title });
        setShowValues(true);
      });
  };

  return (
    <View>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={false}
        onSelectItem={(item) => {
          if (item != null && item != undefined) {
            getFoodById(item);
          } else {
            setShowValues(false);
          }
          setSelectedItem(item);
        }}
        suggestionsListMaxHeight={300}
        dataSet={metafoods}
        textInputProps={{
          placeholder: "Enter 3 Characters to search food",
        }}
      />
      <Button
        title="Add to you're menu"
        onPress={() => addCurrentFoodToMenu()}
      />
      <Button title="show Menu" onPress={() => console.log(menuState)} />
      <View style={{ color: "#668", fontSize: 13 }}>
        {showValues && <ValuesOfFood valuesOfFood={valuesOfFood} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
    flex: 1,
  },
  text: {
    fontSize: 42,
  },
});
