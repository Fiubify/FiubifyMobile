import React, { useState } from "react";
import { StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

function Picker({
  items,
  value,
  setValue,
  placeholder,
  containerStyle,
  valueStyle,
  dropdownStyle,
}) {
  const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      placeholder={placeholder}
      showTickIcon={false}
      setOpen={setOpen}
      setValue={setValue}
      onSelectItem={(value) => setValue(value)}
      style={valueStyle}
      containerStyle={containerStyle}
      textStyle={styles.valueText}
      arrowIconStyle={{ tintColor: "#006E95" }}
      dropDownContainerStyle={dropdownStyle}
      listItemContainerStyle={styles.labelContainerStyle}
      listItemStyle={styles.labelStyle}
    />
  );
}

const styles = StyleSheet.create({
  valueText: {
    color: "#006E95",
    fontSize: 20,
  },
  labelContainerStyle: {
    marginHorizontal: "5%",
    marginVertical: "2%",
    paddingBottom: "5%",
    borderBottomColor: "#CAE3EA",
    borderBottomWidth: 1,
  },
  labelStyle: {
    color: "#006E95",
    fontSize: 20,
  },
});

export default Picker;
