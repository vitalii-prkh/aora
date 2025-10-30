import {Fragment} from "react";
import {Stack} from "expo-router";
import {StatusBar} from "../../components/StatusBar";

function AuthLayout() {
  return (
    <Fragment>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="sign-up"
          options={{headerShown: false}}
        />
      </Stack>
      <StatusBar />
    </Fragment>
  );
}

export default AuthLayout;
