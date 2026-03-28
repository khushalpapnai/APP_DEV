import { useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  Image,
  ImageBackground,
  View,
  Pressable,
  Switch,
  StyleSheet,
  StatusBar,
} from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const DATA = [
  { id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba", title: "First Item" },
  { id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63", title: "Second Item" },
  { id: "58694a0f-3da1-471f-bd96-145571e29d72", title: "Third Item" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    blurRadius: 10,
  },
  fullImage: {
    width: 500,
    height: 500,
  },
});

function HomeScreen() {
  const image =
    "https://th.bing.com/th/id/OIP.hXWwNOQw15ZVWKlMs-xv0wHaFQ?w=261&h=185&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3";

  const [value, setValue] = useState("input value");
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  const pressMe = () => {
    Alert.alert("you have clicked the button");
  };

  return (

    <SafeAreaView>
    <FlatList
      data={DATA}
      renderItem={({ item }) => <Item title={item.title} />}
      keyExtractor={(item) => item.id}

      ListHeaderComponent={
        <>
          <Image style={styles.fullImage} source={{ uri: image }} />

          <ImageBackground
            source={{ uri: image }}
            resizeMode="cover"
            style={styles.image}
          >
            <TextInput
              keyboardType="default"
              style={{
                borderWidth: 1,
                color: "white",
                padding: 10,
                margin: 10,
              }}
              value={value}
              onChangeText={setValue}
              multiline
              numberOfLines={4}
              placeholder="enter your text here"
              placeholderTextColor="white"
            />
          </ImageBackground>

          <Pressable
            onPress={pressMe}
            style={{ backgroundColor: "yellow", padding: 10, margin: 10 }}
          >
            <Text>Press Me</Text>
          </Pressable>
        </>

      }
    />
    </SafeAreaView>
  );
}

export default HomeScreen;
