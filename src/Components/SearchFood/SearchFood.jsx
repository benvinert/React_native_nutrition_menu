import React, { useState, useMemo, useContext, useRef } from "react";
import Autocomplete from "react-native-autocomplete-input";
import { StyleSheet, View, StatusBar, AsyncStorageStatic } from "react-native";
import { metaFoodsHebrew, metaFoodsEnglish } from "../../../MetaDataFoods";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import NutritionValues from "../NutritionMenu/NutritionValues";
import { createMenuContext } from "../NutritionMenu/Context/createMenuContext";
import { Tooltip, Text } from "react-native-elements";
import { useToast } from "react-native-styled-toast";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import GramsPicker from "../GramsPicker/GramsPicker";
import { ScrollView } from "react-native-gesture-handler";
import { themeContext } from "../../ThemeProvider/ThemeManager";
import { getFoodById } from "./SearchFoodService";

export const AutoComplete = ({ route }) => {
  const { menuState, menuDispatch } = useContext(createMenuContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const [valuesOfFood, setValuesOfFood] = useState({ grams: 100 }); //100g is a default
  const [showValues, setShowValues] = useState(false);
  const indexOfMeal = route.params;
  const { toast } = useToast();
  const { applicationTheme } = useContext(themeContext);
  const [metaFoods, setMetaFoods] = useState(metaFoodsEnglish);

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

  return (
    <ScrollView>
      <AutocompleteDropdown
        onChangeText={(text) => {
          console.log(text);
          /**
           * Change food file language according the first character user enter.
           */
          if (text.length <= 1) {
            if (/[a-zA-Z]/.test(text[0])) {
              setMetaFoods(metaFoodsEnglish);
              console.log("ENGLISH");
            } else {
              setMetaFoods(metaFoodsHebrew);
              console.log("HEBRE");
            }
          }
        }}
        clearOnFocus={false}
        closeOnBlur={false}
        onSelectItem={(item) => {
          if (item != null && item != undefined) {
            getFoodById(item, setShowValues, setValuesOfFood);
          } else {
            setShowValues(false);
          }
          setSelectedItem(item);
        }}
        suggestionsListMaxHeight={200}
        dataSet={metaFoods}
        textInputProps={{
          placeholder: "Enter 3 Characters to search food",
        }}
      />
      <View style={{ alignSelf: "center", padding: 10 }}>
        <Text
          style={{
            alignSelf: "center",
            color: applicationTheme.styles.textColor,
          }}
        >
          Grams
        </Text>
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
        {showValues && (
          <NutritionValues
            nutritionValues={valuesOfFood}
            title={"Values of food"}
          />
        )}
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
