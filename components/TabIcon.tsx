import {View, Text, Image, ImageSourcePropType} from "react-native";

type TabIconProps = {
  source: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
};

export function TabIcon(props: TabIconProps) {
  return (
    <View className="flex w-20 items-center justify-center gap-2 pt-4">
      <Image
        source={props.source}
        resizeMode="contain"
        tintColor={props.color}
        className="h-5 w-5"
      />
      <Text
        className={`${props.focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{color: props.color, flexWrap: "nowrap"}}
      >
        {props.name}
      </Text>
    </View>
  );
}
