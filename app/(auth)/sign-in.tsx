import React from "react";
import {ScrollView, View, Text, Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../constants/images";
import {FormField} from "../../components/FormField";
import {CustomButton} from "../../components/CustomButton";
import {SwitchSignType} from "../../components/auth/SwitchSignType";

function ScreenSignIn() {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = React.useState(false);
  const handleChange = (name: string) => (value: string) => {
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    setSubmitting(true);
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="h-full min-h-[85vh] justify-center px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="h-[35px] w-[115px]"
          />
          <Text className="text-semibold mt-10 font-psemibold text-2xl text-white">
            Log in to Aora
          </Text>
          <FormField
            label="Email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange("email")}
            className="mt-7"
            keyboardType="email-address"
          />
          <FormField
            label="Password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange("password")}
            className="mt-7"
            secureTextEntry
          />
          <CustomButton
            containerClassName="mt-7"
            onPress={handleSubmit}
            isLoading={submitting}
          >
            Sign in
          </CustomButton>
          <SwitchSignType
            href="/sign-up"
            name="Sign Up"
            desc="Do not have an account?"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ScreenSignIn;
