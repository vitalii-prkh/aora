import {Fragment} from "react";
import {StatusBar} from "expo-status-bar";
import {Tabs, Redirect} from "expo-router";
import {icons} from "../../constants/icons";
import {TabIcon} from "../../components/TabIcon";

function TabsLayout() {
  return (
    <Fragment>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon({color, focused}) {
              return (
                <TabIcon
                  source={icons.home}
                  color={color}
                  name="Home"
                  focused={focused}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon({color, focused}) {
              return (
                <TabIcon
                  source={icons.bookmark}
                  color={color}
                  name="Bookmark"
                  focused={focused}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon({color, focused}) {
              return (
                <TabIcon
                  source={icons.plus}
                  color={color}
                  name="Create"
                  focused={focused}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon({color, focused}) {
              return (
                <TabIcon
                  source={icons.profile}
                  color={color}
                  name="Profile"
                  focused={focused}
                />
              );
            },
          }}
        />
      </Tabs>
      <StatusBar
        backgroundColor="#161622"
        style="light"
      />
    </Fragment>
  );
}

export default TabsLayout;
