import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Display from "@/components/Display";
import Keypad from "@/components/Keypad";
import History from "@/components/History";
import { calculate } from "@/utils/calc";
import { lightTheme, darkTheme, Theme } from "@/themes/theme";

export default function StandardCalculatorScreen() {
  useEffect(() => {
    if (typeof document !== 'undefined') document.title = 'NexCalci';
  }, []);
  const [expr, setExpr] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [memory, setMemory] = useState<number>(0);
  const [theme, setTheme] = useState<Theme>(lightTheme);

  const toggleTheme = () => setTheme((t) => (t === lightTheme ? darkTheme : lightTheme));

  const handlePress = (val: string) => {
    const functions = ["sin", "cos", "tan", "log", "sqrt"];
    if (val === "*") val = "×";
    if (val === "/") val = "÷";
    if (val === "=" || val === "Enter") {
      const res = calculate(expr);
      setResult(res);
      setHistory((h) => [...h, `${expr} = ${res}`]);
    } else if (val === "C") {
      setExpr("");
      setResult("");
    } else if (val === "⌫" || val === "Backspace") {
      setExpr((s) => s.slice(0, -1));
    } else if (functions.includes(val)) {
      setExpr((s) => s + val + "(");
    } else if (val === "×") {
      setExpr((s) => s + "*");
    } else if (val === "÷") {
      setExpr((s) => s + "/");
    } else if (val === "M+") {
      setMemory((m) => m + Number(result || 0));
    } else if (val === "M-") {
      setMemory((m) => m - Number(result || 0));
    } else if (val === "MR") {
      setExpr((s) => s + String(memory));
    } else if (val === "MC") {
      setMemory(0);
    } else {
      setExpr((s) => s + val);
    }
  };

  useEffect(() => {
    if (Platform.OS === "web") {
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handlePress("=");
          return;
        }
        if (e.key === "Backspace") {
          e.preventDefault();
          handlePress("⌫");
          return;
        }
        const allowed = /[0-9+\-*/().^%a-zA-Z]/;
        if (allowed.test(e.key)) {
          handlePress(e.key);
        }
      };
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
    return;
  }, [expr, result, memory, history]);

  return (
    <View style={[styles.fullScreen, { backgroundColor: theme.background }]}> 
      <SafeAreaView style={styles.safeHeader} edges={["top", "left", "right"]}>
        <View style={styles.headerRow}> 
          <Text style={[styles.title, { color: theme.text }]}>NexCalci</Text> 
          <Text 
            onPress={toggleTheme} 
            style={[styles.toggle, { color: theme.accent }]} 
            accessibilityRole="button" 
          > 
            Toggle Theme 
          </Text> 
        </View>
      </SafeAreaView>
      <Display expression={expr} result={result} color={theme.text} background={theme.displayBackground} />
      <Text style={[styles.memory, { color: theme.text }]}>Memory: {memory}</Text>
      <View style={{ flex: 1 }}>
        <History history={history} color={theme.text} />
      </View>
      <View style={styles.keypadWrapper}>
        <Keypad onPress={handlePress} theme={theme} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: { flex: 1, backgroundColor: 'transparent' },
  safeHeader: { backgroundColor: 'transparent' },
  container: { flex: 1 },
  keypadWrapper: {
    justifyContent: 'flex-end',
    marginBottom: 0,
  },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  title: { fontSize: 22, fontWeight: "700" },
  toggle: { fontSize: 16, fontWeight: "600" },
  memory: { fontSize: 16, marginBottom: 8 },
});
