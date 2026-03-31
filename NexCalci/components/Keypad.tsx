// /components/Keypad.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import Button from "./Button";
import { Theme } from "@/themes/theme";

interface KeypadProps {
  onPress: (val: string) => void;
  theme: Theme;
}

const Keypad: React.FC<KeypadProps> = ({ onPress, theme }) => {
  const rows: string[][] = [
    ["7", "8", "9", "÷"],
    ["4", "5", "6", "×"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
    ["C", "⌫", "(", ")"],
    ["sin", "cos", "tan", "log", "sqrt", "^"],
    ["M+", "M-", "MR", "MC"],
  ];

  return (
    <View style={styles.container}>
      {rows.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((k) => (
            <Button key={k} label={k} onPress={onPress} theme={theme} />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Keypad;
