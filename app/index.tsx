import "../global.css";
import {ScrollView, View, Image, Text} from "react-native";
import {router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "../constants/images";
import {StatusBar} from "../components/StatusBar";
import {CustomButton} from "../components/CustomButton";

function ScreenIndex() {
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{height: "100%"}}>
        <View className="flex min-h-[85vh] w-full items-center justify-center px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="h-[84px] w-[130px]"
          />
          <Image
            source={images.cards}
            resizeMode="contain"
            className="h-[298px] w-full max-w-[380px]"
          />
          <View className="relative">
            <Text className="text-center text-3xl font-bold text-white">
              Discover endless possibilities{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              resizeMode="contain"
              className="absolute -bottom-3 right-2 h-[15px] w-[136px]"
            />
          </View>
          <Text className="mt-7 text-center font-pregular text-sm text-gray-100">
            Where creativity meets innovation: embark on a journey of limitless
            exploration with Aora
          </Text>
          <CustomButton
            onPress={() => router.push("/sign-in")}
            containerClassName="w-full mt-7"
          >
            Continue with Email
          </CustomButton>
        </View>
      </ScrollView>
      <StatusBar />
    </SafeAreaView>
  );
}

export default ScreenIndex;
