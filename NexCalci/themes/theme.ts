// src/theme.ts
export interface Theme {
  background: string;
  text: string;
  displayBackground: string;
  buttonBackground: string;
  buttonText: string;
  specialButtonBackground: string; // for "C"
  specialButtonText: string;
  accent: string;
}

export const lightTheme: Theme = {
  background: "#ffffff",
  text: "#4b0082",
  displayBackground: "#f7f5ff",
  buttonBackground: "#e6e6fa",
  buttonText: "#000000",
  specialButtonBackground: "#ffcccc",
  specialButtonText: "#000000",
  accent: "#b19cd9",
};

export const darkTheme: Theme = {
  background: "#000000",
  text: "#d8b4ff",
  displayBackground: "#0b0010",
  buttonBackground: "#4b0082",
  buttonText: "#ffffff",
  specialButtonBackground: "#800000",
  specialButtonText: "#ffffff",
  accent: "#7c3aed",
};
