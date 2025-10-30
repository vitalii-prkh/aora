import "../../global.css";
import {View, Text} from "react-native";
import {StatusBar} from "expo-status-bar";

function ScreenProfile() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl">Profile</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default ScreenProfile;
