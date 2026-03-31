// /components/Button.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Theme } from "@/themes/theme";

interface ButtonProps {
  label: string;
  onPress: (label: string) => void;
  theme: Theme;
  flex?: number;
}

const Button: React.FC<ButtonProps> = ({ label, onPress, theme, flex = 1 }) => {
  const isSpecial = label === "C";
  const bg = isSpecial ? theme.specialButtonBackground : theme.buttonBackground;
  const color = isSpecial ? theme.specialButtonText : theme.buttonText;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(label)}
      style={[styles.btn, { backgroundColor: bg, flex }]}
    >
      <Text style={[styles.label, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    margin: 6,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 56,
  },
  label: {
    fontSize: 20,
    fontWeight: "600",
  },
});

export default Button;
