import React, { useState, useMemo } from "react";
import Autocomplete from "react-native-autocomplete-input";
import { StyleSheet, View, StatusBar, Button } from "react-native";
import { metafoods } from "../../Utils/metafoods";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import ValuesOfFood from "./ValuesOfFood";
import { serverPath, getFood } from "../../Utils/EndPoints";

export const AutoComplete = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [valuesOfFood, setValuesOfFood] = useState(null);
  const [showValues, setShowValues] = useState(false);

  const getFoodById = async (foodId) => {
    fetch(`${serverPath}${getFood.getFoodById}${foodId}`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setValuesOfFood(jsonResponse);
        setShowValues(true);
      });
  };

  console.log("State of food ", valuesOfFood);

  return (
    <View>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={false}
        onSelectItem={(item) => {
          if (item != null && item != undefined) {
            getFoodById(item.id);
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
        //onPress={() => navigation.navigate("Home", { name: "Jane" })}
      />
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
