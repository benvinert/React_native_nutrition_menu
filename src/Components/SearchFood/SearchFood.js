import React, { useState, useMemo, useContext } from "react";
import Autocomplete from "react-native-autocomplete-input";
import { StyleSheet, View, StatusBar, AsyncStorageStatic } from "react-native";
import { metaFoodsHebrew } from "../../../MetaDataFoods/metaFoodsHebrew";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import NutritionValues from "../NutritionMenu/NutritionValues";
import { serverPath, getFood } from "../../Constants/EndPoints";
import { createMenuContext } from "../NutritionMenu/Context/createMenuContext";
import { Tooltip, Text } from "react-native-elements";
import { useToast } from "react-native-styled-toast";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import GramsPicker from "../GramsPicker/GramsPicker";
import { ScrollView } from "react-native-gesture-handler";

export const AutoComplete = ({ route }) => {
  const { menuState, menuDispatch } = useContext(createMenuContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const [valuesOfFood, setValuesOfFood] = useState({ grams: 100 }); //100g is a default
  const [showValues, setShowValues] = useState(false);
  const indexOfMeal = route.params;
  const { toast } = useToast();

  const addCurrentFoodToMenu = () => {
    if (valuesOfFood.name != undefined && valuesOfFood.name != null) {
      menuDispatch({
        execute: "ADD_FOOD",
        param: { valuesOfFood: valuesOfFood, indexOfMeal: indexOfMeal },
      });
      toast({
        message: "Added Successfully",
        iconFamily: "FontAwesome",
        iconName: "check-circle",
      });
    } else {
      toast({
        message: "You're need to pick a food",
        iconFamily: "FontAwesome",
        iconName: "exclamation-circle",
        accentColor: "red",
        iconColor: "red",
      });
    }
  };

  const getFoodById = async (food) => {
    await fetch(`${serverPath}${getFood.getFoodById}${food.id}`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setValuesOfFood({
          ...jsonResponse,
          foodFromRequest: { ...jsonResponse }, //with that original object we calculate serving size(150g,200g,250g)
          name: food.title,
          grams: 100,
        });
        setShowValues(true);
      });
  };

  return (
    <ScrollView>
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
        dataSet={metaFoodsHebrew}
        textInputProps={{
          placeholder: "Enter 3 Characters to search food",
        }}
      />
      <View style={{ alignSelf: "center" }}>
        <Text style={{ alignSelf: "center" }}>Grams</Text>
        <GramsPicker
          setValuesOfFood={setValuesOfFood}
          valuesOfFood={valuesOfFood}
        />
      </View>

      <Button
        title="Add to you're menu"
        icon={
          <Icon
            style={{ marginLeft: 7 }}
            name="plus-circle"
            iconFamily="FontAwesome"
            size={15}
            color="white"
          />
        }
        iconRight
        onPress={() => addCurrentFoodToMenu()}
      />
      <View style={{ color: "#668", fontSize: 13 }}>
        {showValues && <NutritionValues nutritionValues={valuesOfFood} />}
      </View>
    </ScrollView>
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
