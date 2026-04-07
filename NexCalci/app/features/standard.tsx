// NexCalci - A cross-platform calculator app built with React Native
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Display from "../../components/Display";
import Keypad from "../../components/Keypad";
import History from "../../components/History";
import { calculate } from "../../utils/calc";
import { lightTheme, darkTheme, Theme } from "../../themes/theme";

export default function StandardCalculatorScreen() {
  useEffect(() => {
    if (typeof document !== "undefined") document.title = "NexCalci";
  }, []);
  const [expr, setExpr] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [memory, setMemory] = useState<number>(0);
  const [theme, setTheme] = useState<Theme>(lightTheme);
  const [justEvaluated, setJustEvaluated] = useState(false);

  const toggleTheme = () =>
    setTheme((t) => (t === lightTheme ? darkTheme : lightTheme));

  const handlePress = (val: string) => {
    const functions = ["sin", "cos", "tan", "log", "sqrt"];
    if (val === "*") val = "×";
    if (val === "/") val = "÷";

    // If just evaluated and user presses a number or function, start new expr
    if (justEvaluated && ((/^[0-9.]$/.test(val)) || functions.includes(val))) {
      setExpr(val);
      setResult("");
      setJustEvaluated(false);
      return;
    }

    // If just evaluated and user presses operator, chain with result
    if (justEvaluated && ["+", "-", "×", "÷", "^"].includes(val)) {
      setExpr(result + val);
      setResult("");
      setJustEvaluated(false);
      return;
    }

    if (val === "=" || val === "Enter") {
      const res = calculate(expr);
      setResult(res);
      setHistory((h) => [...h, `${expr} = ${res}`]);
      setJustEvaluated(true);
    } else if (val === "C") {
      setExpr("");
      setResult("");
      setJustEvaluated(false);
    } else if (val === "⌫" || val === "Backspace") {
      setExpr((s) => s.slice(0, -1));
      setJustEvaluated(false);
    } else if (functions.includes(val)) {
      setExpr((s) => s + val + "(");
      setJustEvaluated(false);
    } else if (val === "×") {
      setExpr((s) => s + "*");
      setJustEvaluated(false);
    } else if (val === "÷") {
      setExpr((s) => s + "/");
      setJustEvaluated(false);
    } else if (val === "M+") {
      setMemory((m) => m + Number(result || 0));
      setJustEvaluated(false);
    } else if (val === "M-") {
      setMemory((m) => m - Number(result || 0));
      setJustEvaluated(false);
    } else if (val === "MR") {
      setExpr((s) => s + String(memory));
      setJustEvaluated(false);
    } else if (val === "MC") {
      setMemory(0);
      setJustEvaluated(false);
    } else {
      setExpr((s) => s + val);
      setJustEvaluated(false);
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
      <Display
        expression={expr}
        result={result}
        color={theme.text}
        background={theme.displayBackground}
      />
      <Text style={[styles.memory, { color: theme.text }]}>
        Memory: {memory}
      </Text>
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
  fullScreen: { flex: 1, backgroundColor: "transparent" },
  safeHeader: { backgroundColor: "transparent" },
  container: { flex: 1 },
  keypadWrapper: {
    justifyContent: "flex-end",
    marginBottom: 0,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: { fontSize: 22, fontWeight: "700" },
  toggle: { fontSize: 16, fontWeight: "600" },
  memory: { fontSize: 16, marginBottom: 8 },
});
