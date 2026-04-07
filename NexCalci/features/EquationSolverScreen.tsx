// EquationSolverScreen.tsx
import React, { useState, useRef } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, View, Animated } from 'react-native';
import algebra, { Equation } from 'algebra.js';

const EquationSolverScreen = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const resultAnim = useRef(new Animated.Value(0)).current;

  const solveEquation = () => {
    setError('');
    setResult('');
    resultAnim.setValue(0);
    try {
      let eq = input.replace(/\s+/g, '');
      if (!eq.includes('=')) eq += '=0';

      // Try algebra.js for linear equations
      try {
        const parsed = algebra.parse(eq);
        if (parsed instanceof Equation) {
          const sol = parsed.solveFor('x');
          setResult('x = ' + sol.toString());
          Animated.timing(resultAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
          return;
        }
      } catch (err) {
        // fall through to quadratic check
      }

      // Try quadratic: ax^2+bx+c=0
      const quadMatch = eq.match(/^([+-]?\d*\.?\d*)x\^2([+-]\d*\.?\d*)x([+-]\d*\.?\d*)=0$/);
      if (quadMatch) {
        let a = parseFloat(quadMatch[1] || '1');
        let b = parseFloat(quadMatch[2]);
        let c = parseFloat(quadMatch[3]);
        const D = b * b - 4 * a * c;
        if (D < 0) {
          setResult('No real solutions.');
          Animated.timing(resultAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
        } else {
          const x1 = (-b + Math.sqrt(D)) / (2 * a);
          const x2 = (-b - Math.sqrt(D)) / (2 * a);
          setResult(`x₁ = ${x1}, x₂ = ${x2}`);
          Animated.timing(resultAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
        }
        return;
      }

      setError('Only linear and quadratic equations in x are supported.');
      Animated.timing(resultAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
    } catch (e: any) {
      setError('Invalid equation or unsupported format.');
      Animated.timing(resultAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
    }
  };

  const clearAll = () => {
    setInput('');
    setResult('');
    setError('');
    resultAnim.setValue(0);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.card}>
        <Text style={styles.title}>Equation Solver</Text>
        <Text style={styles.desc}>Enter an equation in x (e.g. x+2=5, 2*x^2+3*x-2=0, x^2-4=0)</Text>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Enter equation"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          returnKeyType="done"
          onSubmitEditing={solveEquation}
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.btn} onPress={solveEquation}>
            <Text style={styles.btnText}>Solve</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearBtn} onPress={clearAll}>
            <Text style={styles.clearBtnText}>Clear</Text>
          </TouchableOpacity>
        </View>
        <Animated.View style={{ opacity: resultAnim, transform: [{ scale: resultAnim.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] }) }] }}>
          {result ? (
            <View style={styles.resultRow}>
              <Text style={styles.resultIcon}>✅</Text>
              <Text style={styles.result}>{result}</Text>
            </View>
          ) : null}
          {error ? (
            <View style={styles.resultRow}>
              <Text style={styles.errorIcon}>❌</Text>
              <Text style={styles.error}>{error}</Text>
            </View>
          ) : null}
        </Animated.View>
        <Text style={styles.hint}>Supports: linear, quadratic equations in x.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#f7f5ff' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
  },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 10, color: '#4b0082' },
  desc: { fontSize: 16, marginBottom: 16, color: '#555', textAlign: 'center' },
  input: { borderWidth: 2, borderColor: '#b19cd9', borderRadius: 12, padding: 16, width: 300, fontSize: 22, marginBottom: 18, backgroundColor: '#f7f5ff' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', width: 300, marginBottom: 16 },
  btn: { backgroundColor: '#4b0082', paddingVertical: 16, paddingHorizontal: 28, borderRadius: 10, alignItems: 'center', marginRight: 10 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 20 },
  clearBtn: { backgroundColor: '#e6e6fa', paddingVertical: 16, paddingHorizontal: 22, borderRadius: 10, alignItems: 'center' },
  clearBtnText: { color: '#4b0082', fontWeight: '700', fontSize: 18 },
  resultRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 6 },
  resultIcon: { fontSize: 28, marginRight: 8 },
  errorIcon: { fontSize: 28, marginRight: 8 },
  result: { color: 'green', fontSize: 22, fontWeight: '700' },
  error: { color: 'red', fontSize: 20, fontWeight: '700' },
  hint: { color: '#888', fontSize: 14, marginTop: 18, textAlign: 'center' },
});

export default EquationSolverScreen;
