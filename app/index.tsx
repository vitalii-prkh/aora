import "../global.css";
import {Text} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Link} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";

function App() {
  return (
    <SafeAreaView className="h-full bg-primary">
      <Text className="text-center text-3xl font-bold text-white">Aora!</Text>
      <Link
        href="/home"
        className="text-center text-3xl font-bold text-white"
      >
        Go to home
      </Link>
      <StatusBar
        backgroundColor="#161622"
        style="light"
      />
    </SafeAreaView>
  );
}

export default App;
