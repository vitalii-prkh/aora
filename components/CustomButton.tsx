import {Text, TouchableOpacity} from "react-native";

type CustomButtonProps = {
  children: string;
  containerClassName?: string;
  textClassName?: string;
  isLoading?: boolean;
  onPress: () => void;
};

export function CustomButton(props: CustomButtonProps) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.7}
      className={`min-h-[62px] items-center justify-center rounded-xl bg-secondary ${props.containerClassName} ${props.isLoading ? "opacity-50" : ""}`}
      disabled={props.isLoading}
    >
      <Text
        className={`font-psemibold text-lg text-primary ${props.textClassName}`}
      >
        {props.children}
      </Text>
    </TouchableOpacity>
  );
}
