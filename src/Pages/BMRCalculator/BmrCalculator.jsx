import React from "react";
import { Button, TextInput, View, Text, StyleSheet } from "react-native";
import { Formik } from "formik";

export const BmrCalculator = ({ route, navigation }) => {
  const styles = StyleSheet.create({
    formikContainer: {
      backgroundColor: "#ededed",
    },
  });
  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <Text>Email</Text>
          <TextInput
            style={styles.formikContainer}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
          />
          <Button onPress={handleSubmit} title="Submitdsat" />
        </View>
      )}
    </Formik>
  );
};
