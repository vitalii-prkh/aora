import {router} from "expo-router";
import {View, Text, Image} from "react-native";
import {images} from "../constants/images";
import {CustomButton} from "./CustomButton";

type EmptyStateProps = {
  title: string;
  subtitle: string;
};

export function EmptyState({title, subtitle}: EmptyStateProps) {
  return (
    <View className="flex items-center justify-center px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="h-[216px] w-[270px]"
      />
      <Text className="font-pmedium text-sm text-gray-100">{title}</Text>
      <Text className="mt-2 text-center font-psemibold text-xl text-white">
        {subtitle}
      </Text>
      <CustomButton
        onPress={() => router.push("/home")}
        containerClassName="w-full my-5"
      >
        Back to Explore
      </CustomButton>
    </View>
  );
}
