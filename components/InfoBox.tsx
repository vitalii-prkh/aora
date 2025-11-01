import {View, Text} from "react-native";

type InfoBoxProps = {
  title: string | number;
  subtitle?: string;
  titleClassName?: string;
  containerClassName?: string;
};

export function InfoBox(props: InfoBoxProps) {
  const {title, subtitle, containerClassName, titleClassName} = props;

  return (
    <View className={containerClassName}>
      <Text
        className={`text-center font-psemibold text-white ${titleClassName}`}
      >
        {title}
      </Text>
      <Text className="text-center font-pregular text-sm text-gray-100">
        {subtitle}
      </Text>
    </View>
  );
}
