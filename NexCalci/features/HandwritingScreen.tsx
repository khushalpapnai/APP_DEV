// HandwritingScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HandwritingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Handwriting Recognition</Text>
      {/* Add handwriting recognition UI and logic */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
});

export default HandwritingScreen;
