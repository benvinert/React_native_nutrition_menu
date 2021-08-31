import React from "react";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableHighlight,
  FlatList,
} from "react-native";
export default function MenuTable({ menuObject }) {
  const HeaderSection = ({ mealTime }) => {
    return (
      <View style={{ marginBottom: 10 }}>
        <Text>{mealTime}</Text>
        <TouchableHighlight>
          <View
            style={{
              borderRadius: 7,
              backgroundColor: "green",
              width: 35,
              height: 35,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white" }}>Add</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  const CellVariant = (props) => (
    <Cell
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
  return (
    <TableView style={styles.tableView}>
      <FlatList
        data={menuObject}
        keyExtractor={(item, index) => item.mealTime}
        renderItem={({ item }) => (
          <Section headerComponent={<HeaderSection mealTime={item.mealTime} />}>
            <View style={{ flex: 1 }}>
              <FlatList
                data={item.foods}
                keyExtractor={(food, index) => food.name}
                renderItem={(food) => <CellVariant title={food.item.name} />}
              />
            </View>
          </Section>
        )}
      />
    </TableView>
  );
}

const styles = StyleSheet.create({
  tableView: {
    marginTop: 30,
  },
});
