import React, { useContext } from "react";
import { CellVariant, HeaderSection } from "./NutritionTableStyleSheet";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { createMenuContext } from "./Context/createMenuContext";

export const NutritionTable = ({ route, navigation }) => {
  const { menuState, setMenuState } = useContext(createMenuContext);
  //Initial State of menu
  var menuObject;
  //get it from Menus Component
  if (!route.params.isNowCreated) {
    menuObject = route.params.menu;
  } else {
    menuObject = menuState.menu;
  }

  return (
    <View>
      <TableView style={styles.tableView}>
        <View style={{ height: 500 }}>
          <FlatList
            data={menuObject}
            keyExtractor={(item, index) => item.mealTime}
            renderItem={({ item }) => (
              <Section
                headerComponent={<HeaderSection mealTime={item.mealTime} />}
              >
                <View style={{ flex: 1 }}>
                  <FlatList
                    data={item.foods}
                    keyExtractor={(food, index) => food.name}
                    renderItem={(food) => (
                      <CellVariant title={food.item.name} />
                    )}
                  />
                </View>
              </Section>
            )}
          />
        </View>
      </TableView>
    </View>
  );
};

const styles = StyleSheet.create({
  tableView: {
    marginTop: 30,
  },
});
