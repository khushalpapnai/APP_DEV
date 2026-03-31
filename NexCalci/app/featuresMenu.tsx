// featuresMenu.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const features = [
  { label: 'Standard Calculator', route: '/features/standard' },
  { label: 'Graphing', route: '/features/graphing' },
  { label: 'Unit Conversions', route: '/features/unit-conversion' },
  { label: 'Equation Solver', route: '/features/equation-solver' },
  { label: 'Programmable Mode', route: '/features/programmable' },
  { label: 'Voice Input', route: '/features/voice-input' },
  { label: 'Handwriting Recognition', route: '/features/handwriting' },
  { label: 'Matrix Calculations', route: '/features/matrix' },
  { label: 'Statistics', route: '/features/statistics' },
  { label: 'Financial Calculations', route: '/features/financial' },
];

const FeaturesMenu = () => {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Calculator Features</Text>
      {features.map((f) => (
        <TouchableOpacity key={f.route} style={styles.btn} onPress={() => router.push(f.route as any)}>
          <Text style={styles.btnText}>{f.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 24 },
  btn: { backgroundColor: '#e6e6fa', padding: 16, borderRadius: 10, marginVertical: 8, minWidth: 220, alignItems: 'center' },
  btnText: { fontSize: 18, fontWeight: '600' },
});

export default FeaturesMenu;
