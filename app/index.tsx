import '../global.css';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';

function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pblack">Aora!</Text>
      <StatusBar style="auto" />
      <Link href="/profile">
        Go to profile
      </Link>
    </View>
  );
}

export default App;
