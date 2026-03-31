// /components/History.tsx
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

interface HistoryProps {
  history: string[];
  color: string;
}

const History: React.FC<HistoryProps> = ({ history, color }) => {
  const last = history.slice(-10).reverse();
  return (
    <View style={{ marginTop: 12 }}>
      <ScrollView style={{ maxHeight: 160 }}>
        {last.map((item, idx) => (
          <Text key={idx} style={[styles.item, { color }]}>
            {item}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    fontSize: 16,
    paddingVertical: 4,
  },
});

export default History;
