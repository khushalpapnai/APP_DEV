what should you have in your system or mobile:

1. Node js
2. code editor (vscode)
3. git bash
4. expo go! in mobile

steps to run the project:
    1. npx create-expo-app@latest

- cd NexCalci
- npm run android
- npm run ios # you need to use macOS to build the iOS project - use the Expo app if you need to do iOS development without a Mac
- npm run web

2.1 another way to create the project is by using the command:
npx create-expo-app my-calculator

2.2 also need to install spacifice expo version means stable version of expo to avoid any issues with the project. you can check the stable version of expo on their official website.
    npm install expo@54
    npx expo install expo-constants expo-device expo-font expo-glass-effect expo-image expo-linking expo-router expo-splash-screen expo-status-bar expo-symbols expo-system-ui expo-web-browser




1. then you can cd into the project and run the above commands to run the project on different platforms.

2. simplifies the project by running this command:
 bun run reset-project
 press n and enter

3. install react dependency: (those versions are compatible with expo 54)
   npx expo install react react-dom react-native react-native-gesture-handler react-native-reanimated react-native-screens react-native-worklets @types/react

##########################################################
-- start the project again by running --:
 npx expo start
 use the expo go app in your mobile to scan the QR code and run the project on your mobile device.
