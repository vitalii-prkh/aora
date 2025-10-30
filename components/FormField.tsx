import React from "react";
import {View, Text, TextInput, TouchableOpacity, Image} from "react-native";
import {icons} from "../constants/icons";

type FormFieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  keyboardType?: "email-address";
  secureTextEntry?: boolean;
};

export function FormField(props: FormFieldProps) {
  const [show, setShow] = React.useState(false);

  return (
    <View className={`space-y-2 ${props.className}`}>
      <Text className="font-pmedium text-base text-gray-100">
        {props.label}
      </Text>
      <View className="h-16 w-full flex-row items-center rounded-2xl border-2 border-black-200 bg-black-100 px-4 focus:border-secondary">
        <TextInput
          className="flex-1 font-psemibold text-white"
          value={props.value}
          onChangeText={props.onChange}
          placeholder={props.placeholder}
          placeholderTextColor="#7b7b8b"
          keyboardType={props.keyboardType}
          secureTextEntry={show}
        />
        {props.secureTextEntry && (
          <TouchableOpacity
            className="size-8 items-center justify-center"
            onPress={() => setShow(!show)}
          >
            <Image
              source={show ? icons.eye : icons.eyeHide}
              resizeMode="contain"
              className="h-6 w-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
