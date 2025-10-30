import React from "react";
import {Text, View} from "react-native";
import {Link} from "expo-router";

type SwitchSignTypeProps = {
  href: string;
  desc: string;
  name: string;
};

export function SwitchSignType(props: SwitchSignTypeProps) {
  return (
    <View className="flex-row justify-center gap-2 pt-5">
      <Text className="font-regular text-lg text-gray-100">{props.desc} </Text>
      <Link
        href={props.href}
        className="font-psemibold text-lg text-secondary"
      >
        {props.name}
      </Link>
    </View>
  );
}
