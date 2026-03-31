// /components/Display.tsx
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

interface DisplayProps {
  expression: string;
  result: string;
  color: string;
  background: string;
}

const Display: React.FC<DisplayProps> = ({ expression, result, color, background }) => {
  // Show expression with × instead of * (calc stores * internally)
  const shownExpr = expression.replace(/\*/g, "×");

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <ScrollView horizontal contentContainerStyle={styles.scroll}>
        <Text style={[styles.expr, { color }]} numberOfLines={1}>
          {shownExpr || "0"}
        </Text>
      </ScrollView>
      <Text style={[styles.result, { color }]}>{result || ""}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    minHeight: 110,
    justifyContent: "center",
  },
  scroll: {
    alignItems: "flex-end",
  },
  expr: {
    fontSize: 28,
    textAlign: "right",
    paddingRight: 8,
  },
  result: {
    fontSize: 36,
    textAlign: "right",
    marginTop: 6,
    fontWeight: "600",
  },
});

export default Display;
