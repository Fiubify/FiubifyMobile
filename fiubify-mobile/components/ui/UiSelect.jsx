import React from "react";
import { StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

function Selector({
  data,
  placeholder,
  setValue,
  valueStyle,
  labelContainerStyle,
  defaultValue = undefined,
  itemSelection = (item) => item,
}) {
  return (
    <SelectDropdown
      data={data}
      defaultValue={defaultValue}
      statusBarTranslucent={true}
      defaultButtonText={placeholder}
      buttonTextAfterSelection={(selectedItem, _index) => {
        return itemSelection(selectedItem);
      }}
      rowTextForSelection={(item, _index) => {
        return itemSelection(item);
      }}
      renderDropdownIcon={(isOpened) => {
        return (
          <MaterialIcons
            name={isOpened ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={20}
            color="#006E95"
          />
        );
      }}
      onSelect={(selectedItem, _index) => {
        setValue(selectedItem);
      }}
      buttonStyle={valueStyle}
      buttonTextStyle={styles.valueText}
      dropdownStyle={styles.dropdown}
      dropdownOverlayColor="none"
      rowStyle={labelContainerStyle}
      rowTextStyle={styles.labelStyle}
    />
  );
}

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: "white",
    borderWidth: 0,
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#006E95",
    fontSize: 20,
  },
  valueText: {
    textAlign: "left",
    color: "#006E95",
    fontSize: 20,
  },
  labelStyle: {
    width: "95%",
    color: "#006E95",
    fontSize: 20,
    textAlign: "left",
    textAlignVertical: "center",
  },
});

export default Selector;
